import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import * as dotenv from "dotenv";

dotenv.config({ path: process.cwd()+'/.env' });


const config: HardhatUserConfig = {
  solidity: "0.8.9",
  zksolc: {
    version: "0.1.0",
    compilerSource: "docker",
    settings: {
      compilerPath: "zksolc",
      experimental: {
        dockerImage: "matterlabs/zksolc",
        tag: "latest"
      }
    }
  },
  zkSyncDeploy: {
    zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
    ethNetwork: `https://goerli.infura.io/v3/${process.env.GOERLI_INFURA_KEY}`,
  },
  networks: {
    hardhat: {
      zksync: true,
    },
  },
};

export default config;
