import { CONTRACTS, OmniTestNFTArgs } from "./../scripts/constants";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("OmniTestNFT", function () {
  it("Should return the new greeting once it's changed", async function () {
    const OmniTestNFT = await ethers.getContractFactory(CONTRACTS.OmniTestNFT);
    const { baseURI, chainId, layerZeroEndpoint, nextTokenId, maxMint } =
      OmniTestNFTArgs["rinkeby"];
    const omnitestNFT = await OmniTestNFT.deploy(
      baseURI,
      layerZeroEndpoint,
      nextTokenId,
      maxMint
    );
    await omnitestNFT.deployed();

    await omnitestNFT.setBaseURI("base uri");
    // expect(await omnitestNFT.baseUri()).to.equal("base uri");
  });
});
