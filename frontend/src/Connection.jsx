import { useState } from "react";
import { Button, Typography, Box, CardContent, Card } from '@mui/material';
import { ethers } from 'ethers';
import contractAbi from './contracts/SecureMediChainABI.json';

// hardhat contract address
// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// sepolia contract address
const contractAddress = "0x21b7250a234CEAc50efd2C62fa110D232bc41E9F";
const INFURA_PROJECT_ID = "04fbac3771a742b8a64409c30fb5fa29";

export let exportedSigner = null;
export let contractInstance = null;

export const Web3ConnectionButton = ({ setOwnerAddress, setSigner, setContractInstance }) => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  async function connectWallet() {
    if (!connected) {
      try {
        // Ensure the user has MetaMask or another web3 provider installed
        if (!window.ethereum) {
          alert('Please install MetaMask!');
          return;
        }

        // Initialize ethers with MetaMask's provider
        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();
        exportedSigner = signer;
        setSigner(signer);
      
        const _walletAddress = await signer.getAddress();
        setConnected(true);
        setWalletAddress(_walletAddress);

        // Create contract instance
        if (!contractInstance) {
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          contractInstance = contract;
          setContractInstance(contract);

          try {
            const _ownerAddress = await contractInstance.owner();
            setOwnerAddress(_ownerAddress);
          } catch (error) {
            console.error('Error fetching owner:', error);
          }
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      setConnected(false);
      setWalletAddress("");
      exportedSigner = null;
      contractInstance = null;
      setSigner(null);
      setContractInstance(null);
    }
  }

  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Button
        variant="contained"
        onClick={connectWallet}
        sx={{ mb: 2, backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' } }}
      >
        {connected ? "Disconnect Wallet" : "Connect Wallet"}
      </Button>
      {walletAddress && (
        <Card sx={{ maxWidth: 500, mx: 'auto', backgroundColor: '#e3f2fd', mt: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              🎉 Connected Successfully! 🎉
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your wallet address:
            </Typography>
            <Typography variant="body1" sx={{ wordWrap: 'break-word', fontWeight: 'bold', color: '#1a237e' }}>
              {walletAddress}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
