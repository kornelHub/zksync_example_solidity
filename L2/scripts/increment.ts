import { BigNumber, Contract, ethers, Wallet } from 'ethers';
import { Provider, utils } from 'zksync-web3';
import * as dotenv from "dotenv";

const CONTRACT_L1_ABI = require('./ContractL1.json');
const CONTRACT_L1_ADDRESS = '0x2bD79B20d404F06bFF5e2Fe96E39dD65a37B7B7b';
const CONTRACT_L2_ABI = require('./ContractL2.json');
const CONTRACT_L2_ADDRESS = '0xf0707436B2F9255DdCCeDbe7F3d3b735886DDBB5';

dotenv.config({ path: process.cwd()+'/.env' });

async function main() {
    // Ethereum L1 provider
    const l1Provider = ethers.providers.getDefaultProvider('goerli');

    // Governor wallet
    const wallet = new Wallet(String(process.env.ETH_PRIVATE_KEY), l1Provider);

    const govcontract = new Contract(
        CONTRACT_L1_ADDRESS,
        CONTRACT_L1_ABI,
        wallet
    );

    // Getting the current address of the zkSync L1 bridge
    const l2Provider = new Provider('https://zksync2-testnet.zksync.dev');
    const zkSyncAddress = await l2Provider.getMainContractAddress();
    // Getting the `Contract` object of the zkSync bridge
    const zkSyncContract = new Contract(
        zkSyncAddress,
        utils.ZKSYNC_MAIN_ABI,
        wallet
    );

    // Encoding the tx data the same way it is done on Ethereum.
    const exchangeL2Interface = new ethers.utils.Interface(CONTRACT_L2_ABI);
    const data = exchangeL2Interface.encodeFunctionData("increment", []);

    // The price of the L1 transaction requests depends on the gas price used in the call
    const gasPrice = await l1Provider.getGasPrice();

    // Here we define the constant for ergs limit .
    const ergsLimit = BigNumber.from(100000);
    // Getting the cost of the execution.
    const baseCost = await zkSyncContract.l2TransactionBaseCost(
        gasPrice,
        ergsLimit,
        ethers.utils.hexlify(data).length,
        0,
    );

    // Calling the L1 governance contract.
    const tx = await govcontract.callZkSync(
        zkSyncAddress, 
        CONTRACT_L2_ADDRESS, 
        data,
        ergsLimit,
        {
            // Passing the necessary ETH `value` to cover the fee for the operation
            value: baseCost,
            gasPrice
        }
    );

    // Waiting until the L1 tx is complete.
    await tx.wait();

    // Getting the TransactionResponse object for the L2 transaction corresponding to the 
    // execution call
    const l2Response = await l2Provider.getL2TransactionFromPriorityOp(tx);

    // The receipt of the L2 transaction corresponding to the call to the Increment contract
    const l2Receipt = await l2Response.wait();
    console.log(l2Receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
