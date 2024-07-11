/* module just for checking that i can connect to my infura node */

const { ethers } = require('ethers');

// Replace with your Infura project ID
const INFURA_PROJECT_ID = '04fbac3771a742b8a64409c30fb5fa29';

// Connect to the Sepolia network using Infura
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`);

async function main() {
  try {
    // Get the latest block number to verify the connection
    const blockNumber = await provider.getBlockNumber();
    console.log('Successfully connected to Infura Sepolia endpoint.');
    console.log('Current block number:', blockNumber);
  } catch (error) {
    console.error('Error connecting to Infura:', error);
  }
}

main();
