
import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

const EthCrypto = require("eth-crypto");

function GetPatientPrivateKeyHash({ setpatientPrivateKeyHash }) {
  const [textArea, setTextArea] = useState('');

  const handleTextChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleButtonClick = () => {
    const patientPrivateKeyHash = EthCrypto.hash.keccak256(textArea);
    setpatientPrivateKeyHash(patientPrivateKeyHash);
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Typography variant="h6" gutterBottom>
        Enter Patient Private Key:
      </Typography>
      <TextField
        type="password"
        value={textArea}
        onChange={handleTextChange}
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Enter patient private key"
      />
      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2 }}>
        Send patient private key (secured)
      </Button>
    </Box>
  );
}

export default GetPatientPrivateKeyHash;
