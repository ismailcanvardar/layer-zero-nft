/* eslint-disable node/no-missing-import */
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACTS, SecoNFTArgs } from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const { baseURI, layerZeroEndpoint } = SecoNFTArgs.avalancheFujiTestnet;

  await deploy(CONTRACTS.SecoNFT, {
    from: deployer,
    args: [baseURI, layerZeroEndpoint],
    log: true,
  });

  console.log(CONTRACTS.SecoNFT, "deployed by", deployer);
};

func.tags = [CONTRACTS.SecoNFT, "SecoNFT"];
export default func;
