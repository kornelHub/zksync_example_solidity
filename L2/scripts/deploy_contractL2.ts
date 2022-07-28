import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as dotenv from "dotenv";
import hre from "hardhat";

dotenv.config({ path: process.cwd()+'/.env' });

// An example of a deploy script that will deploy and call a simple contract.
async function main (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the ContractL2 contract`);

  // Initialize the wallet.
  const wallet = new Wallet(String(process.env.ETH_PRIVATE_KEY));

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("ContractL2");

  // Deposit some funds to L2 in order to be able to perform deposits.
  const depositAmount = ethers.utils.parseEther("0.01");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const contractL2 = await deployer.deploy(artifact, []);

  // Show the contract info.
  console.log(`${artifact.contractName} was deployed to ${contractL2.address}`);
}

main(hre).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});