// Replace the import and network initialization
import { 
  fetchCallReadOnlyFunction, 
  stringAsciiCV, 
  standardPrincipalCV, 
  uintCV, 
  cvToValue 
} from '@stacks/transactions';
import { connect, request, disconnect, getLocalStorage } from '@stacks/connect';

// Use string literal for the network instead of class instances
const network = 'testnet';
// For mainnet use: const network = 'mainnet';

// Contract details
const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'; // Replace with actual contract deployer address
const contractName = 'sBTC-pulse';

// Connect to wallet
export const connectWallet = async () => {
  try {
    const response = await connect();
    return response;
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
};

// Disconnect wallet
export const disconnectWallet = () => {
  disconnect();
};

// Get current user's address
export const getCurrentAddress = () => {
  const storage = getLocalStorage();
  if (storage && storage.addresses && storage.addresses.stx && storage.addresses.stx.length > 0) {
    return storage.addresses.stx[0].address;
  }
  return null;
};

// Read-only functions
export const getStreak = async (userAddress) => {
  const options = {
    contractAddress,
    contractName,
    functionName: 'get-streak',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
    senderAddress: userAddress,
  };
  
  try {
    const result = await fetchCallReadOnlyFunction(options);
    return cvToValue(result);
  } catch (error) {
    console.error('Error fetching streak:', error);
    return 0;
  }
};

export const getRewards = async (userAddress) => {
  const options = {
    contractAddress,
    contractName,
    functionName: 'get-rewards',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
    senderAddress: userAddress,
  };
  
  try {
    const result = await fetchCallReadOnlyFunction(options);
    return cvToValue(result);
  } catch (error) {
    console.error('Error fetching rewards:', error);
    return 0;
  }
};

export const getTier = async (userAddress) => {
  const options = {
    contractAddress,
    contractName,
    functionName: 'get-tier',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
    senderAddress: userAddress,
  };
  
  try {
    const result = await fetchCallReadOnlyFunction(options);
    return cvToValue(result);
  } catch (error) {
    console.error('Error fetching tier:', error);
    return 0;
  }
};

export const getLastCheckIn = async (userAddress) => {
  const options = {
    contractAddress,
    contractName,
    functionName: 'get-last-check-in',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
    senderAddress: userAddress,
  };
  
  try {
    const result = await fetchCallReadOnlyFunction(options);
    return cvToValue(result);
  } catch (error) {
    console.error('Error fetching last check-in:', error);
    return 0;
  }
};

export const getTotalUsers = async () => {
  const options = {
    contractAddress,
    contractName,
    functionName: 'get-total-users',
    functionArgs: [],
    network,
    senderAddress: contractAddress,
  };
  
  try {
    const result = await fetchCallReadOnlyFunction(options);
    return cvToValue(result);
  } catch (error) {
    console.error('Error fetching total users:', error);
    return 0;
  }
};

export const getLeaderboard = async (limit = 10) => {
  const options = {
    contractAddress,
    contractName,
    functionName: 'get-leaderboard',
    functionArgs: [uintCV(limit)],
    network,
    senderAddress: contractAddress,
  };
  
  try {
    const result = await fetchCallReadOnlyFunction(options);
    return cvToValue(result);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

// Public functions (require wallet authentication)
export const checkIn = async () => {
  try {
    const response = await request('stx_callContract', {
      contractAddress,
      contractName,
      functionName: 'check-in',
      functionArgs: [],
      // Simplified network handling - just use the string directly
      network: network === 'mainnet' ? 'mainnet' : 'testnet',
    });
    
    return response;
  } catch (error) {
    console.error('Error during check-in:', error);
    throw error;
  }
};

export const claimRewards = async () => {
  try {
    const response = await request('stx_callContract', {
      contractAddress,
      contractName,
      functionName: 'claim-rewards',
      functionArgs: [],
      // Simplified network handling - just use the string directly
      network: network === 'mainnet' ? 'mainnet' : 'testnet',
    });
    
    return response;
  } catch (error) {
    console.error('Error claiming rewards:', error);
    throw error;
  }
};

// Utility functions
export const canCheckInToday = async (userAddress) => {
  const lastCheckIn = await getLastCheckIn(userAddress);
  if (lastCheckIn === 0) return true;
  
  const lastCheckInDate = new Date(lastCheckIn * 1000);
  const today = new Date();
  
  return lastCheckInDate.getDate() !== today.getDate() || 
         lastCheckInDate.getMonth() !== today.getMonth() || 
         lastCheckInDate.getFullYear() !== today.getFullYear();
};

export const formatBTCValue = (value) => {
  return parseFloat(value).toFixed(8).replace(/\.?0+$/, '');
};

export const formatUSDValue = (btcValue, btcPrice = 65000) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(btcValue * btcPrice);
};
