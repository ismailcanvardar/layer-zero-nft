// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./interfaces/ILayerZeroEndpoint.sol";
import "./NonblockingReceiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract OmniTestNFT is Ownable, ERC721, NonblockingReceiver {
    address public _owner;
    string private baseURI;
    uint256 public nextTokenId;
    uint256 public immutable maxMint;
    uint256 public mintLimitPerTxn = 2;

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
        _owner = msg.sender;
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
    error MintLimitPerTxn(uint8 numTokens, uint256 mintLimitPerTxn);
    error OnlyTokenOwner(address callerAddress);
    error UnavailableChain(uint16 chainId);
    error InsufficientMessageFee(uint256 senderAmount, uint256 messageFee);

    modifier onlyTokenOwner(uint256 tokenId) {
        if (msg.sender != ownerOf(tokenId)) {
            revert OnlyTokenOwner({callerAddress: msg.sender});
        }
        _;
    }

    // mint function
    // you can choose to mint 1 or 2
    // mint is free, but payments are accepted
    function mint(uint8 numTokens) external payable {
        if (numTokens > mintLimitPerTxn) {
            revert MintLimitPerTxn({
                numTokens: numTokens,
                mintLimitPerTxn: mintLimitPerTxn
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

    function setBaseURI(string calldata _uri) external onlyOwner {
        baseURI = _uri;
    }

    function donate() external payable {
        // thank you
    }

    // This allows the devs to receive kind donations
    function withdraw(uint256 amt) external onlyOwner {
        (bool sent, ) = payable(_owner).call{value: amt}("");
        require(sent, "GG: Failed to withdraw Ether");
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
            return super.tokenURI(tokenId);
        }

        return revealUrl;
    }

    function revealCollection() public onlyOwner {
        revealed = true;
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
