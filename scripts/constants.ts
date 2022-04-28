export const CONTRACTS = Object.freeze({
  OmniTestNFT: "OmniTestNFT",
});

export interface IOmniTestNFTArgs {
  [rinkeby: string]: {
    baseURI: string;
    layerZeroEndpoint: string;
    nextTokenId: number;
    maxMint: number;
  };
  bscTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
    nextTokenId: number;
    maxMint: number;
  };
  avalancheFujiTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
    nextTokenId: number;
    maxMint: number;
  };
  polygonMumbai: {
    baseURI: string;
    layerZeroEndpoint: string;
    nextTokenId: number;
    maxMint: number;
  };
  arbitrumTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
    nextTokenId: number;
    maxMint: number;
  };
  optimisticKovan: {
    baseURI: string;
    layerZeroEndpoint: string;
    nextTokenId: number;
    maxMint: number;
  };
  ftmTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
    nextTokenId: number;
    maxMint: number;
  };
}

export const OmniTestNFTArgs: IOmniTestNFTArgs = {
  rinkeby: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA",
    nextTokenId: 0,
    maxMint: 10,
  },
  bscTestnet: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
    nextTokenId: 10,
    maxMint: 20,
  },
  avalancheFujiTestnet: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
    nextTokenId: 20,
    maxMint: 30,
  },
  polygonMumbai: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",
    nextTokenId: 30,
    maxMint: 40,
  },
  arbitrumTestnet: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x4D747149A57923Beb89f22E6B7B97f7D8c087A00",
    nextTokenId: 40,
    maxMint: 50,
  },
  optimisticKovan: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x72aB53a133b27Fa428ca7Dc263080807AfEc91b5",
    nextTokenId: 50,
    maxMint: 60,
  },
  ftmTestnet: {
    baseURI: "ipfs://QmQkq89zh1HvZBFYiysdD9UNYuy1K53suAcsqdHktNA8MW/",
    layerZeroEndpoint: "0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf",
    nextTokenId: 60,
    maxMint: 70,
  },
};
