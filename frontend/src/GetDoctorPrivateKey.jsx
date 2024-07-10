import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function GetDoctorPrivateKey({ setDotorPrivateKey }) {
  const [textArea, setTextArea] = useState('');

  const handleTextChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleButtonClick = () => {
    setDotorPrivateKey(textArea);
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
