// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./interfaces/ILayerZeroEndpoint.sol";
import "./NonblockingReceiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract OmniTestNFT is Ownable, ERC721, NonblockingReceiver {
    string private baseURI;
    uint256 public nextTokenId;
    uint256 public immutable maxMint;
    uint256 public mintLimit = 2;
    string private baseExtension = ".json";
    bool public paused;

    mapping(address => bool) public whitelist;
    mapping(address => uint8) public mintCounter;

    uint256 public gasForDestinationLzReceive = 350000;

    bool private revealed = false;
    string private revealUrl;

    constructor(
        string memory _baseUri,
        address _lzEndpoint,
        uint256 _nextTokenId,
        uint256 _maxMint,
        string memory _revealUrl
    ) ERC721("OmniTestNFT", "OTNFT") {
        endpoint = ILayerZeroEndpoint(_lzEndpoint);
        baseURI = _baseUri;
        nextTokenId = _nextTokenId;
        maxMint = _maxMint;
        revealUrl = _revealUrl;
    }

    error MintExceedsSupply(
        uint8 numTokens,
        uint256 currentTokenId,
        uint256 maxMint
    );
    error MintLimitPerTxn(uint8 numTokens, uint256 mintLimit);
    error OnlyTokenOwner(address callerAddress);
    error UnavailableChain(uint16 chainId);
    error InsufficientMessageFee(uint256 senderAmount, uint256 messageFee);
    error FailedToWithdraw(bool sent);
    error OnlyWhitelist(address user);
    error MintAmountExceeds(address user, uint256 totalMinted);

    modifier onlyTokenOwner(uint256 tokenId) {
        if (msg.sender != ownerOf(tokenId)) {
            revert OnlyTokenOwner({callerAddress: msg.sender});
        }
        _;
    }

    modifier onlyWhitelist() {
        if (whitelist[msg.sender] != true) {
            revert OnlyWhitelist({user: msg.sender});
        }

        _;
    }

    modifier isAmountExceeds() {
        uint256 totalMinted = mintCounter[msg.sender];
        if (totalMinted >= mintLimit) {
            revert MintAmountExceeds({
                user: msg.sender,
                totalMinted: totalMinted
            });
        }

        _;
    }

    modifier isPaused() {
        require(paused == false, "Contract Paused");
        _;
    }

    function grantWhitelist(address[] calldata _addresses) external onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = true;
        }
    }

    function revokeWhitelist(address[] calldata _addresses) external onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            delete whitelist[_addresses[i]];
        }
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    // mint function
    // you can choose to mint 1 or 2
    // mint is free, but payments are accepted
    function mint(uint8 numTokens)
        external
        payable
        isPaused
        onlyWhitelist
        isAmountExceeds
    {
        if (numTokens > mintLimit) {
            revert MintLimitPerTxn({
                numTokens: numTokens,
                mintLimit: mintLimit
            });
        }
        if (nextTokenId + numTokens >= maxMint) {
            revert MintExceedsSupply({
                numTokens: numTokens,
                currentTokenId: nextTokenId,
                maxMint: maxMint
            });
        }

        for (uint256 i; i < numTokens; i++) {
            _safeMint(msg.sender, ++nextTokenId);
        }

        mintCounter[msg.sender] = numTokens;
    }

    // This function transfers the nft from your address on the
    // source chain to the same address on the destination chain
    function traverseChains(uint16 _chainId, uint256 tokenId)
        public
        payable
        onlyTokenOwner(tokenId)
    {
        if (trustedRemoteLookup[_chainId].length == 0) {
            revert UnavailableChain({chainId: _chainId});
        }

        // burn NFT, eliminating it from circulation on src chain
        _burn(tokenId);

        // abi.encode() the payload with the values to send
        bytes memory payload = abi.encode(msg.sender, tokenId);

        // encode adapterParams to specify more gas for the destination
        uint16 version = 1;
        bytes memory adapterParams = abi.encodePacked(
            version,
            gasForDestinationLzReceive
        );

        // get the fees we need to pay to LayerZero + Relayer to cover message delivery
        // you will be refunded for extra gas paid
        (uint256 messageFee, ) = endpoint.estimateFees(
            _chainId,
            address(this),
            payload,
            false,
            adapterParams
        );

        if (msg.value <= messageFee) {
            revert InsufficientMessageFee({
                senderAmount: msg.value,
                messageFee: messageFee
            });
        }

        endpoint.send{value: msg.value}(
            _chainId, // destination chainId
            trustedRemoteLookup[_chainId], // destination address of nft contract
            payload, // abi.encoded()'ed bytes
            payable(msg.sender), // refund address
            address(0x0), // 'zroPaymentAddress' unused for this
            adapterParams // txParameters
        );
    }

    function revealCollection() external onlyOwner {
        revealed = true;
    }

    function setMintLimitPerTxn(uint256 _mintLimit) external onlyOwner {
        mintLimit = _mintLimit;
    }

    function setBaseExtension(string calldata _newBaseExtension)
        external
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setBaseURI(string calldata _uri) external onlyOwner {
        baseURI = _uri;
    }

    function donate() external payable {
        // thank you
    }

    // This allows the devs to receive kind donations
    function withdraw(uint256 amt) external onlyOwner {
        (bool sent, ) = payable(owner()).call{value: amt}("");
        if (sent == false) {
            revert FailedToWithdraw({sent: sent});
        }
    }

    // just in case this fixed variable limits us from future integrations
    function setGasForDestinationLzReceive(uint256 newVal) external onlyOwner {
        gasForDestinationLzReceive = newVal;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (revealed == true) {
            return
                bytes(baseURI).length > 0
                    ? string(
                        abi.encodePacked(
                            baseURI,
                            Strings.toString(tokenId),
                            baseExtension
                        )
                    )
                    : "";
        }

        return revealUrl;
    }

    function _LzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 _nonce,
        bytes memory _payload
    ) internal override {
        // decode
        (address toAddr, uint256 tokenId) = abi.decode(
            _payload,
            (address, uint256)
        );

        // mint the tokens back into existence on destination chain
        _safeMint(toAddr, tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
