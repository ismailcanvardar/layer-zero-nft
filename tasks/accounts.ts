import { task } from "hardhat/config";
import "hardhat-deploy";

task(
  "accounts",
  "Prints the list of accounts",
  async (args, { ethers, deployments, getNamedAccounts }) => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
      console.log(account.address);
    }
  }
);
