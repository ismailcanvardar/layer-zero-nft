import { CONTRACTS, OmniTestNFTArgs } from "./../scripts/constants";
import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Signer } from "ethers";

describe("OmniTestNFT", function () {
  let accounts: Signer[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
  });

  it("Should return the new greeting once it's changed", async function () {
    const OmniTestNFT = await ethers.getContractFactory(CONTRACTS.OmniTestNFT);
    const { baseURI, layerZeroEndpoint, maxMint, nextTokenId, revealUrl } =
      OmniTestNFTArgs["rinkeby"];
    const omniTestNFT = await OmniTestNFT.deploy(
      baseURI,
      layerZeroEndpoint,
      nextTokenId,
      maxMint,
      revealUrl
    );
    await omniTestNFT.deployed();

    await omniTestNFT.setPaused(false);
    const paused = await omniTestNFT.paused();
    console.log(paused);
    const owner = accounts[0].getAddress();
    await omniTestNFT.grantWhitelist(owner);
    await omniTestNFT.mint(2, { value: 0 });
    await omniTestNFT.mint(1, { value: 0 });

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
