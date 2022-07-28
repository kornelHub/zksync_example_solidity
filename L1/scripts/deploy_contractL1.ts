import { ethers } from "hardhat";

async function main() {
  const ContractL1 = await ethers.getContractFactory("ContractL1");
  const contractL1 = await ContractL1.deploy();
  await contractL1.deployed();
  console.log("ContractL1 contract address: ", contractL1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
