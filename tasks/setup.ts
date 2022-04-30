import { task } from "hardhat/config";
import "hardhat-deploy";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { OmniTestNFT__factory } from "../typechain";
import { CONTRACTS, NetworkUrls, OmniTestNFTArgs } from "../scripts/constants";
import path from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Deployment } from "hardhat-deploy/types";

export const writeTmpAddresses = (filePath: string, data: any) => {
  if (existsSync(filePath)) {
    const tmpAddresses = JSON.parse(readFileSync(filePath, "utf8"));
    const formattedData = [...tmpAddresses, { ...data }];

    writeFileSync(filePath, JSON.stringify(formattedData));
    return;
  }
  writeFileSync(filePath, JSON.stringify([data]));
};

task("extract-contracts", "Extracts deployed contracts").setAction(
  async (args, { network, ethers, deployments, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const networkName: string = network.name;

    const omniTestNftDeployment: Deployment = await deployments.get(
      CONTRACTS.OmniTestNFT
    );

    const tmpAddressesFilepath = path.join(
      __dirname,
      "..",
      `./tmp/contract_addresses.json`
    );

    const CONTRACT_INFO = {
      contractName: Object.keys(CONTRACTS)[0],
      contractAddress: omniTestNftDeployment.address,
      blockExplorerUrl:
        NetworkUrls[networkName] + omniTestNftDeployment.address,
      network: networkName,
    };

    writeTmpAddresses(tmpAddressesFilepath, CONTRACT_INFO);

    console.log("extract-contracts completed");
  }
);

task("verify-contract", "Verifies deployed contracts").setAction(
  async (args, { network, ethers, deployments, run }) => {
    const networkName = network.name;

    const omniTestNftDeployment: Deployment = await deployments.get(
      CONTRACTS.OmniTestNFT
    );

    const command: string = "verify";
    const contractAddress: string = omniTestNftDeployment.address;
    const { baseURI, layerZeroEndpoint, nextTokenId, maxMint, revealUrl } =
      OmniTestNFTArgs[networkName];

    await run(command, {
      address: contractAddress,
      constructorArgsParams: [
        baseURI,
        layerZeroEndpoint,
        nextTokenId.toString(),
        maxMint.toString(),
        revealUrl,
      ],
    });

    console.log("verify-contract completed");
  }
);

task("reveal", "Verifies deployed contracts").setAction(
  async (args, { network, ethers, deployments, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const signer = ethers.provider.getSigner(deployer);
    const networkName = network.name;

    const omniTestNftDeployment: Deployment = await deployments.get(
      CONTRACTS.OmniTestNFT
    );

    const omniTestNft = OmniTestNFT__factory.connect(
      omniTestNftDeployment.address,
      signer
    );

    await omniTestNft.revealCollection();

    console.log("reveal completed for", networkName);
  }
);
