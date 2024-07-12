import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Alert } from '@mui/material';

function GetDoctorPrivateKey({ setDotorPrivateKey }) {
  const [textArea, setTextArea] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

  const handleTextChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleButtonClick = () => {
    setDotorPrivateKey(textArea);
    setAlertMessage(<Alert severity="success">Done</Alert>);
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
      {alertMessage && (
        <Box sx={{ mt: 2 }}>
          {alertMessage}
        </Box>
      )}
    </Box>
  );
}

export default GetDoctorPrivateKey;
