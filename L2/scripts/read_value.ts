import { Contract, Provider } from 'zksync-web3'

const CONTRACT_L2_ABI = require('./ContractL2.json');
const CONTRACT_L2_ADDRESS = '0xf0707436B2F9255DdCCeDbe7F3d3b735886DDBB5';

async function main() {
    // Initialize the wallet.
    const l2Provider = new Provider('https://zksync2-testnet.zksync.dev');

    const counter = new Contract(
      CONTRACT_L2_ADDRESS,
      CONTRACT_L2_ABI,
      l2Provider
    );

    console.log(`The counter value is ${(await counter.value()).toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
