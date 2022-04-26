export const CONTRACTS = Object.freeze({
  SecoNFT: "SecoNFT",
});

interface ISecoNFTArgs {
  rinkeby: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
  avalancheFujiTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
  bscTestnet: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
  polygonMumbai: {
    baseURI: string;
    layerZeroEndpoint: string;
  };
}

export const SecoNFTArgs: ISecoNFTArgs = {
  rinkeby: {
    baseURI: "ipfs://QmQ4p8MQ6idYDG2n2SDFQbqLSkZovkYVhLpT8j5dzM5nVc/",
    layerZeroEndpoint: "0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA",
  },
  avalancheFujiTestnet: {
    baseURI: "ipfs://QmQ4p8MQ6idYDG2n2SDFQbqLSkZovkYVhLpT8j5dzM5nVc/",
    layerZeroEndpoint: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
  },
  bscTestnet: {
    baseURI: "ipfs://QmQ4p8MQ6idYDG2n2SDFQbqLSkZovkYVhLpT8j5dzM5nVc/",
    layerZeroEndpoint: "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
  },
  polygonMumbai: {
    baseURI: "ipfs://QmQ4p8MQ6idYDG2n2SDFQbqLSkZovkYVhLpT8j5dzM5nVc/",
    layerZeroEndpoint: "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",
  },
};
