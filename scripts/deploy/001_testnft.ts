/* eslint-disable node/no-missing-import */
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACTS, OmniTestNFTArgs } from "../constants";
import * as dotenv from "dotenv";
import { network } from "hardhat";
dotenv.config();

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const { baseURI, layerZeroEndpoint, maxMint, nextTokenId } =
    OmniTestNFTArgs[network.name];

  await deploy(CONTRACTS.OmniTestNFT, {
    from: deployer,
    args: [baseURI, layerZeroEndpoint, nextTokenId, maxMint],
    log: true,
  });

  console.log(
    CONTRACTS.OmniTestNFT,
    "deployed by",
    deployer,
    "to",
    network.name,
    "network."
  );
};

func.tags = [CONTRACTS.OmniTestNFT, "OmniTestNFT"];
export default func;
