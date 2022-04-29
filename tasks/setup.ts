import { task } from "hardhat/config";
import "hardhat-deploy";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { OmniTestNFT__factory } from "../typechain";
import { CONTRACTS, OmniTestNFTArgs } from "../scripts/constants";
import path from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";

export const writeTmpAddresses = (filePath: string, data: any) => {
  if (existsSync(filePath)) {
    let tmpAddresses = JSON.parse(readFileSync(filePath, "utf8"));
    const formattedData = [...tmpAddresses, { ...data }];

    writeFileSync(filePath, JSON.stringify(formattedData));
    return;
  }
  writeFileSync(filePath, JSON.stringify([data]));
};

task("extract-contracts", "Extracts deployed contracts").setAction(
  async (args, { network, ethers, deployments, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const networkName = network.name;
    const signer = ethers.provider.getSigner(deployer);

    const omniTestNftDeployment = await deployments.get(CONTRACTS.OmniTestNFT);

    const tmpAddressesFilepath = path.join(
      __dirname,
      "..",
      `./tmp/contract_addresses.json`
    );

    const CONTRACT_INFO = {
      contractName: Object.keys(CONTRACTS)[0],
      contractAddress: omniTestNftDeployment.address,
      network: networkName,
    };

    writeTmpAddresses(tmpAddressesFilepath, CONTRACT_INFO);

    console.log("extract-contracts completed");
  }
);
