import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACTS, LayerZeroNFTArgs } from "../constants";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const { baseURI, layerZeroEndpoint } = LayerZeroNFTArgs.rinkeby;

  await deploy(CONTRACTS.LayerZeroNFT, {
    from: deployer,
    args: [baseURI, layerZeroEndpoint],
    log: true,
  });

  console.log(CONTRACTS.LayerZeroNFT, "deployed by", deployer);
};

func.tags = [CONTRACTS.LayerZeroNFT, "LayerZeroNFT"];
export default func;
