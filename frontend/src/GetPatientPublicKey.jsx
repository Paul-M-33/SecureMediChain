import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function GetPatientPublicKey({ setPatientPublicKey }) {
  const [textArea, setTextArea] = useState('');

  const handleTextChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleButtonClick = () => {
    setPatientPublicKey(textArea);
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Typography variant="h6" gutterBottom>
        Enter Patient Public Key:
      </Typography>
      <TextField
        value={textArea}
        onChange={handleTextChange}
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Enter patient public key"
      />
      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2 }}>
        Send patient public key
      </Button>
    </Box>
  );
}

export default GetPatientPublicKey;
