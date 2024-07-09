import './App.css';
import React from 'react';
import { Button, Box } from '@mui/material';

function SetPrescriptionAsDelivered() {
  const handleButtonClick = () => {
    /* TODO : set prescription as valid on the blockchain */
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2 }}>
        Set Prescription as Delivered
      </Button>
    </Box>
  );
}

export default SetPrescriptionAsDelivered;