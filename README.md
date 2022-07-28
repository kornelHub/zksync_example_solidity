# Descriptions
This is basic demo of using zksync L2 solution. This project contains 2 smart contracts. Contract on L1 (Ethereum) and contract on L2 that holds couter value and can be incremented via function. We can call increment function directly on from L1.

## Contract deployed
ContractL1 (Goerli network): https://goerli.etherscan.io/address/0x2bD79B20d404F06bFF5e2Fe96E39dD65a37B7B7b

ContractL2 (zksync dev network): https://zksync2-testnet.zkscan.io/address/0xf0707436B2F9255DdCCeDbe7F3d3b735886DDBB5/transactions


## Interact with contracts
### Read couter value on L2
navigate to /L2 folder and run:

```
hh run scripts/read_value.ts
```

Following message should be displayed:
`The counter value is 1`


### Increment couter value via L1 
navigate to /L2 folder and run:

```
hh run scripts/increment.ts
```

Following message should be displayed:
```js
{
  to: '0xf0707436B2F9255DdCCeDbe7F3d3b735886DDBB5',
  from: '0x2bD79B20d404F06bFF5e2Fe96E39dD65a37B7B7b',
  contractAddress: null,
  transactionIndex: 0,
  root: '0x18872e4b86a17844c2fb80bc3a81a88adfe53c958c63c3e1f9fd6e3e61cf1626',
  gasUsed: BigNumber { _hex: '0x00', _isBigNumber: true },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blockHash: '0x18872e4b86a17844c2fb80bc3a81a88adfe53c958c63c3e1f9fd6e3e61cf1626',
  transactionHash: '0x4d54d6a5651c742bf8c792723c4eb3c4da82c9a4897999d45453ca07aec1717a',
  logs: [],
  blockNumber: 667808,
  confirmations: 2,
  cumulativeGasUsed: BigNumber { _hex: '0x00', _isBigNumber: true },
  effectiveGasPrice: BigNumber { _hex: '0x00', _isBigNumber: true },
  status: 1,
  type: 0,
  byzantium: true
}
```