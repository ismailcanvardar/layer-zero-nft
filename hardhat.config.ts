import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-contract-sizer";
require("@openzeppelin/hardhat-upgrades");

import "./tasks";

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
  POLYGON_MUMBAI: 80001,
  ARBITRUM_RINKEBY: 421611,
  OPTIMISM_KOVAN: 69,
};

if (!process.env.PRIVATE_KEY)
  throw new Error("PRIVATE_KEY not found. Set PRIVATE_KEY to the .env file");
const privateKey = process.env.PRIVATE_KEY;

if (!process.env.DEPLOYER)
  throw new Error("DEPLOYER not found. Set DEPLOYER to the .env file");
const deployer = process.env.DEPLOYER;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const getApiKey = () => {
  switch (process.env.HARDHAT_NETWORK) {
    case "mainnet":
    case "rinkeby":
      return process.env.ETHERSCAN_API_KEY;
    case "bscTestnet":
      return process.env.BSCSCAN_API_KEY;
    case "avalancheFujiTestnet":
      return process.env.SNOWTRACE_API_KEY;
    case "polygonMumbai":
      return process.env.POLYGONSCAN_API_KEY;
    case "arbitrumTestnet":
      return process.env.ARBITRUMSCAN_API_KEY;
    case "optimisticKovan":
      return process.env.OPTIMISMSCAN_API_KEY;
    case "ftmTestnet":
      return process.env.FANTOMSCAN_API_KEY;
    default:
      return "";
  }
};

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      chainId: CHAIN_IDS.RINKEBY,
      accounts: [`0x${privateKey}`],
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_URL || "",
      chainId: CHAIN_IDS.BSC_TESTNET,
      accounts: [`0x${privateKey}`],
    },
    avalancheFujiTestnet: {
      url: process.env.FUJI_URL || "",
      chainId: CHAIN_IDS.FUJI,
      allowUnlimitedContractSize: true,
      accounts: [`0x${privateKey}`],
    },
    polygonMumbai: {
      url: process.env.POLYGON_MUMBAI_TESTNET_URL || "",
      chainId: CHAIN_IDS.POLYGON_MUMBAI,
      accounts: [`0x${privateKey}`],
    },
    arbitrumTestnet: {
      url: process.env.ARBITRUM_RINKEBY_TESTNET_URL || "",
      chainId: CHAIN_IDS.ARBITRUM_RINKEBY,
      accounts: [`0x${privateKey}`],
    },
    optimisticKovan: {
      url: process.env.OPTIMISM_KOVAN_TESTNET_URL || "",
      chainId: CHAIN_IDS.OPTIMISM_KOVAN,
      accounts: [`0x${privateKey}`],
    },
    ftmTestnet: {
      url: process.env.FANTOM_TESTNET_URL || "",
      chainId: CHAIN_IDS.FANTOM_TESTNET,
      accounts: [`0x${privateKey}`],
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
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
};

export default config;
