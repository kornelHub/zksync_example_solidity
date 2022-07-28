import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config({ path: process.cwd()+'/.env' });

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.GOERLI_INFURA_KEY}`,
      accounts: [String(process.env.ETH_PRIVATE_KEY)]
    },
  }
};

export default config;
