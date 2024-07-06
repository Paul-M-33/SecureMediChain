import React, { useState } from 'react';
import { TextField, MenuItem, Box, Typography } from '@mui/material';

function RoleDropdown({ setRole }) {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);
    setRole(newRole);
  };

  return (
    <Box>
      <Typography variant="h6">Select your role:</Typography>
      <TextField
        select
        label="Role"
        value={selectedRole}
        onChange={handleRoleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="">--Please choose an option--</MenuItem>
        <MenuItem value="Owner">Owner</MenuItem>
        <MenuItem value="Doctor">Doctor</MenuItem>
        <MenuItem value="Pharmacist">Pharmacist</MenuItem>
        <MenuItem value="Random User">Random User</MenuItem>
      </TextField>
    </Box>
  );
}

export default RoleDropdown;
