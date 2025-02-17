import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Alert } from '@mui/material';

function GetPatientAddress({ setPatientAddress }) {
  const [textArea, setTextArea] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

  const handleTextChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleButtonClick = () => {
    setPatientAddress(textArea);
    setAlertMessage(<Alert severity="success">Done</Alert>);
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Typography variant="h6" gutterBottom>
        Enter Patient address:
      </Typography>
      <TextField
        value={textArea}
        onChange={handleTextChange}
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Enter patient address"
      />
      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2 }}>
        Send patient address
      </Button>
      {alertMessage && (
        <Box sx={{ mt: 2 }}>
          {alertMessage}
        </Box>
      )}
    </Box>
  );
}

export default GetPatientAddress;
