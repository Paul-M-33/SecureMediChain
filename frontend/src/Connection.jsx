import { useState } from "react";
import { Button, Typography, Box, CardContent, Card } from '@mui/material';
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
}

export default Web3ConnectionButton;
