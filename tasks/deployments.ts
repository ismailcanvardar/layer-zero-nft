import { task } from "hardhat/config";
import "hardhat-deploy";
import { OmniTestNFT__factory } from "../typechain";
import { CONTRACTS, OmniTestNFTArgs } from "../scripts/constants";

task(
  "mint",
  "Deploys to all of the chains",
  async (args, { ethers, deployments, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const signer = ethers.provider.getSigner(deployer);

    const omniTestNftDeployment = await deployments.get(CONTRACTS.OmniTestNFT);
    const omniTestNft = OmniTestNFT__factory.connect(
      omniTestNftDeployment.address,
      signer
    );
  }
);

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
