import { task } from "hardhat/config";
import "hardhat-deploy";
import { OmniTestNFT__factory } from "../typechain";
import { CONTRACTS, OmniTestNFTArgs } from "../scripts/constants";
import { int } from "hardhat/internal/core/params/argumentTypes";

// Example usage: hh mint
task("mint", "Deploys to all of the chains")
  .addParam("amount", "Token minting amount", 2, int, true)
  .setAction(async (args, { ethers, deployments, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const signer = ethers.provider.getSigner(deployer);

    const omniTestNftDeployment = await deployments.get(CONTRACTS.OmniTestNFT);
    const omniTestNft = OmniTestNFT__factory.connect(
      omniTestNftDeployment.address,
      signer
    );

    await omniTestNft.mint(args.amount);
  });

// Example usage: hh set-remotes
// sh usage: sh ./trustedNetwork.sh
task(
  "set-remotes",
  "Sets trusted remotes for contracts",
  async (args, { ethers, deployments, getNamedAccounts, network }) => {
    const { deployer } = await getNamedAccounts();
    const signer = ethers.provider.getSigner(deployer);

    const omniTestNftDeployment = await deployments.get(CONTRACTS.OmniTestNFT);
    const omniTestNft = OmniTestNFT__factory.connect(
      omniTestNftDeployment.address,
      signer
    );

    console.log("Trusted remote configuration initiated for", network.name);

    for (const networkName of Object.keys(OmniTestNFTArgs)) {
      if (networkName === network.name) {
        continue;
      }

      const jsonPath = `../deployments/${networkName}/OmniTestNFT.json`;
      const { address } = require(jsonPath);

      const { chainId } = OmniTestNFTArgs[networkName];
      await omniTestNft.setTrustedRemote(chainId, address);

      console.log("Trusted remote set for", chainId, "to", networkName);
    }
  }
);

// Example usage: hh set-remote --network avalancheFujiTestnet --chainid 10012 --remoteaddress 0x676992e83264FaAFda4000bCcA586eB2347AB35B
task("set-remote", "Sets trusted remote for contract")
  .addParam("chainid")
  .addParam("remoteaddress")
  .setAction(
    async (args, { ethers, deployments, getNamedAccounts, network }) => {
      const { chainid, remoteaddress } = args;

      const { deployer } = await getNamedAccounts();
      const signer = ethers.provider.getSigner(deployer);

      const omniTestNftDeployment = await deployments.get(
        CONTRACTS.OmniTestNFT
      );
      const omniTestNft = OmniTestNFT__factory.connect(
        omniTestNftDeployment.address,
        signer
      );

      await omniTestNft.setTrustedRemote(
        ethers.BigNumber.from(parseInt(chainid)),
        remoteaddress
      );
    }
  );

// Example usage: hh deploy-omnitest
// sh usage: sh ./deploy.sh
task(
  "deploy-omnitest",
  "Deploys OmniTestNFT contract",
  async (args, { ethers, deployments, getNamedAccounts, network }) => {
    try {
      const { deployer } = await getNamedAccounts();
      const { deploy } = deployments;

      const { baseURI, layerZeroEndpoint, maxMint, nextTokenId } =
        OmniTestNFTArgs[network.name];

      await deploy(CONTRACTS.OmniTestNFT, {
        from: deployer,
        args: [baseURI, layerZeroEndpoint, nextTokenId, maxMint],
        log: true,
      });

      console.log(`Contract is deployed to ${network.name}`);
    } catch (err: any) {
      throw new Error(err);
    }
  }
);
