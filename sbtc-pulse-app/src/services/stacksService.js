import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { callReadOnlyFunction, makeContractCall, broadcastTransaction } from '@stacks/transactions';
import { userSession, openContractCall } from '@stacks/connect';

// Configure network (use testnet for development)
const network = new StacksTestnet();
// For mainnet use: const network = new StacksMainnet();

// Contract details
const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'; // Replace with actual contract deployer address
const contractName = 'sBTC-pulse';

// Read-only functions
export const getStreak = async (userAddress) => {
  const options = {
    contractAddress,
    contractName,
    functionName: 'get-streak',
    functionArgs: [userAddress],
    network,
    senderAddress: userAddress,
  };
  
  const result = await callReadOnlyFunction(options);
  return result.value.value;
};

export const getRewards = async (userAddress) => {
  const options = {
    contractAddress,
    contractName,
    functionName: 'get-rewards',
    functionArgs: [userAddress],
    network,
    senderAddress: userAddress,
  };
  
  const result = await callReadOnlyFunction(options);
  return result.value.value;
};

export const getTier = async (userAddress) => {
  const options = {
    contractAddress,
    contractName,
    functionName: 'get-tier',
    functionArgs: [userAddress],
    network,
    senderAddress: userAddress,
  };
  
  const result = await callReadOnlyFunction(options);
  return result.value.value;
};

// Public functions (require wallet authentication)
export const checkIn = async () => {
  const functionArgs = [];
  
  const options = {
    contractAddress,
    contractName,
    functionName: 'check-in',
    functionArgs,
    network,
    appDetails: {
      name: 'sBTC Pulse',
      icon: window.location.origin + '/logo.png',
    },
    onFinish: data => {
      console.log('Transaction:', data);
      return data;
    },
  };
  
  return openContractCall(options);
};