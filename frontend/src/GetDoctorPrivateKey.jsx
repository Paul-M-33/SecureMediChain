import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

const EthCrypto = require('eth-crypto');

function GetDoctorPrivateKey({ setDotorPrivateKey }) {
  const [textArea, setTextArea] = useState('');

  const handleTextChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleButtonClick = () => {
    setDotorPrivateKey(textArea);
    console.log("Doctor public key from private key");
    let pubk = EthCrypto.publicKeyByPrivateKey(textArea);
    console.log(pubk);
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Typography variant="h6" gutterBottom>
        Enter Your Private Key:
      </Typography>
      <TextField
        type="password"
        value={textArea}
        onChange={handleTextChange}
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Enter your private key"
      />
      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2 }}>
        Send your private key (secured)
      </Button>
    </Box>
  );
}

export default GetDoctorPrivateKey;
