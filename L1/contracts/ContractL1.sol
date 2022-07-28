// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@matterlabs/zksync-contracts/l1/contracts/zksync/interfaces/IZkSync.sol";

contract ContractL1 {

    function callZkSync(
        address zkSyncAddress, 
        address contractAddr, 
        bytes memory data,
        uint64 ergsLimit
    ) external payable {
        IZkSync zksync = IZkSync(zkSyncAddress);
        zksync.requestL2Transaction{value: msg.value}(contractAddr, data, ergsLimit, new bytes[](0), QueueType.Deque);
    }
}