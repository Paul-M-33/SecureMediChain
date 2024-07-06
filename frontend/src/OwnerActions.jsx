import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Typography } from '@mui/material';

function OwnerActions() {
    const [roleToAdd, setRoleToAdd] = useState('');
    const [keyStringValue, setKeyStringValue] = useState('');
    const [doctorPublicKey, setdoctorPublicKey] = useState('');
    const [pharmacistPublicKey, setpharmacistPublicKey] = useState('');

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        setRoleToAdd(newRole);
    };

    const handleKeyString = (event) => {
        if (roleToAdd) {
            setKeyStringValue(event.target.value);
        }
    };

    const handleButtonClick = () => {
        if (keyStringValue) {
            if (roleToAdd === 'Doctor') {
                setdoctorPublicKey(keyStringValue);
            }
            else if (roleToAdd === 'Pharmacist') {
                setpharmacistPublicKey(keyStringValue);
            }
            // TOTO : send the key just added to BC
        }
    };

  return (
    <Box>
      <Typography variant="h6">Select public key to add (pharmacist or doctor):</Typography>
      <TextField
        select
        label="Select role for which you want to add a key "
        value={roleToAdd}
        onChange={handleRoleChange}
        fullWidth
        margin="normal"
        sx={{ width: '50%' }} // Set width to 50% of its container
      >
        <MenuItem value="Doctor">Add Doctor</MenuItem>
        <MenuItem value="Pharmacist">Add Pharmacist</MenuItem>
      </TextField>

      <Typography variant="h6">Enter Doctor or Pharmacist public key:</Typography>
      <TextField
        value={keyStringValue}
        onChange={handleKeyString}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2 }}>
        Add Key to Blockchain
      </Button>
    </Box>
  );
}

export default OwnerActions;
