import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Alert } from '@mui/material';

function GetPatientPublicKey({ setPatientPublicKey }) {
  const [textArea, setTextArea] = useState('');
  const [alertMessage, setAlertMessage] = useState(null); // State to manage the alert message

  const handleTextChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleButtonClick = () => {
    setPatientPublicKey(textArea);
    setAlertMessage(<Alert severity="success">Done</Alert>); // Display the alert message when button is clicked
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
      {alertMessage && ( // Conditionally render the alert message
        <Box sx={{ mt: 2 }}>
          {alertMessage}
        </Box>
      )}
    </Box>
  );
}

export default GetPatientPublicKey;
