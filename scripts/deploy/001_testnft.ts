import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACTS, TestNFTArgs } from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy(CONTRACTS.TestNFT, {
    from: deployer,
    args: [TestNFTArgs.baseURI, TestNFTArgs.layerZeroEndpoint],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  console.log(CONTRACTS.TestNFT, "deployed by", deployer);
};

func.tags = [CONTRACTS.TestNFT, "TestNFT"];
export default func;
