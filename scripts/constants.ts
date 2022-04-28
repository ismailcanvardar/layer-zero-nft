export const CONTRACTS = Object.freeze({
  OmniTestNFT: "OmniTestNFT",
});

export interface IOmniTestNFTArgs {
  rinkeby: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
  bscTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
  avalancheFujiTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
  polygonMumbai: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
  arbitrumTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
  optimisticKovan: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
  ftmTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
}

export const OmniTestNFTArgs: IOmniTestNFTArgs = {
  rinkeby: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA",
  },
  bscTestnet: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
  },
  avalancheFujiTestnet: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
  },
  polygonMumbai: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",
  },
  arbitrumTestnet: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x4D747149A57923Beb89f22E6B7B97f7D8c087A00",
  },
  optimisticKovan: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x72aB53a133b27Fa428ca7Dc263080807AfEc91b5",
  },
  ftmTestnet: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf",
  },
};
