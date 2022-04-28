/* eslint-disable node/no-missing-import */
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACTS, OmniTestNFTArgs } from "../constants";
import * as dotenv from "dotenv";
dotenv.config();

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const { baseURI, layerZeroEndpoint } = OmniTestNFTArgs.ftmTestnet;

  await deploy(CONTRACTS.OmniTestNFT, {
    from: deployer,
    args: [baseURI, layerZeroEndpoint],
    log: true,
  });

  console.log(CONTRACTS.OmniTestNFT, "deployed by", deployer);
};

func.tags = [CONTRACTS.OmniTestNFT, "OmniTestNFT"];
export default func;
