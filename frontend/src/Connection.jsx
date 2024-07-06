import { useState } from "react";
import { Button, Typography, Box } from '@mui/material';
const ethers = require("ethers");

function Web3ConnectionButton() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  async function connectWallet() {
    if (!connected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
    } else {
      setConnected(false);
      setWalletAddress("");
    }
  }

  return (
    <Box sx={{ my: 4 }}>
      <Button variant="contained" onClick={connectWallet}>
        {connected ? "Disconnect Wallet" : "Connect Wallet"}
      </Button>
      {walletAddress && (
        <>
          <Typography variant="h6">Connected address is:</Typography>
          <Typography variant="body1">{walletAddress}</Typography>
        </>
      )}
    </Box>
  );
}

export default Web3ConnectionButton;
