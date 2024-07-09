import React, { useState } from 'react';
import { useContractActions } from './ContractActionsComponent';
import { TextField, Button, Box, MenuItem, Typography } from '@mui/material';
import MessageDialog from './MessageDialog';

function OwnerActions() {
  const { 
    addDoctor, 
    removeDoctor, 
    addPharmacist, 
    removePharmacist,
    dialogOpen,
    dialogTitle,
    dialogMessage,
    dialogType,
    setDialogOpen 
  } = useContractActions();

  const [roleToAdd, setRoleToAdd] = useState('');
  const [keyStringValue, setKeyStringValue] = useState('');

  const handleRoleChange = (event) => {
    setRoleToAdd(event.target.value);
  };

  const handleKeyString = (event) => {
    setKeyStringValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (keyStringValue) {
      if (roleToAdd === 'Add Doctor') {
        addDoctor(keyStringValue);
      } else if (roleToAdd === 'Remove Doctor') {
        removeDoctor(keyStringValue);
      } else if (roleToAdd === 'Add Pharmacist') {
        addPharmacist(keyStringValue);
      } else if (roleToAdd === 'Remove Pharmacist') {
        removePharmacist(keyStringValue);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6">Select action:</Typography>
      <TextField
        select
        label="Select role for which you want to add or remove a key"
        value={roleToAdd}
        onChange={handleRoleChange}
        fullWidth
        margin="normal"
        sx={{ width: '60%' }}
      >
        <MenuItem value="Add Doctor">Add Doctor</MenuItem>
        <MenuItem value="Remove Doctor">Remove Doctor</MenuItem>
        <MenuItem value="Add Pharmacist">Add Pharmacist</MenuItem>
        <MenuItem value="Remove Pharmacist">Remove Pharmacist</MenuItem>
      </TextField>

      <Typography variant="h6">Enter Doctor or Pharmacist address:</Typography>
      <TextField
        value={keyStringValue}
        onChange={handleKeyString}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2 }}>
        Add/Remove Key to Blockchain
      </Button>
      <MessageDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        title={dialogTitle} 
        message={dialogMessage} 
        type={dialogType} 
      />
    </Box>
  );
}

export default OwnerActions;
