import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

export const CHAIN_IDS = {
  HARDHAT: 31337,
  MAINNET: 1,
  RINKEBY: 4,
  ROPSTEN: 3,
  GANACHE: 1337,
  AVAX: 43114,
  FUJI: 43113,
  FANTOM: 250,
  FANTOM_TESTNET: 0xfa2,
  BSC_TESTNET: 97,
  // POLYGON_MUMBAI: 10009,
  POLYGON_MUMBAI: 80001,
};

if (!process.env.PRIVATE_KEY)
  throw new Error("PRIVATE_KEY not found. Set PRIVATE_KEY to the .env file");
const privateKey = process.env.PRIVATE_KEY;

if (!process.env.DEPLOYER)
  throw new Error("DEPLOYER not found. Set DEPLOYER to the .env file");
const deployer = process.env.DEPLOYER;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const getApiKey = () => {
  switch (process.env.HARDHAT_NETWORK) {
    case "mainnet":
    case "rinkeby":
      return process.env.ETHERSCAN_API_KEY;
    case "avalancheFujiTestnet":
      return process.env.SNOWTRACE_API_KEY;
    case "polygonMumbai":
      return process.env.POLYGONSCAN_API_KEY;
    default:
      return "";
  }
};

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    avalancheFujiTestnet: {
      url: process.env.FUJI_URL || "",
      chainId: CHAIN_IDS.FUJI,
      allowUnlimitedContractSize: true,
      accounts: [`0x${privateKey}`],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      chainId: CHAIN_IDS.RINKEBY,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygonMumbai: {
      url: process.env.POLYGON_MUMBAI_TESTNET_URL || "",
      chainId: CHAIN_IDS.POLYGON_MUMBAI,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: getApiKey(),
  },
  namedAccounts: {
    deployer,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./scripts/deploy",
    deployments: "./deployments",
  },
};

export default config;
