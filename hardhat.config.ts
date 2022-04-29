import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-contract-sizer";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";

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
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      ftmTestnet: process.env.FANTOMSCAN_API_KEY,
      optimisticKovan: process.env.OPTIMISMSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      arbitrumTestnet: process.env.ARBITRUMSCAN_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
    },
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
