import React from 'react';
import { Typography, Box } from '@mui/material';

function AccountInfo({ role }) {
  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      {role && (
        <Typography variant="body1" gutterBottom>
          Your role is: <strong>{role}</strong>
        </Typography>
      )}
      {role === "Owner" && (
        <Typography variant="body2">
          You can add/remove doctors and pharmacists public addresses.
        </Typography>
      )}
      {role === "Doctor" && (
        <Typography variant="body2">
          You can upload prescriptions, sign and hash it, and set the public patient address related to that prescription.
        </Typography>
      )}
      {role === "Pharmacist" && (
        <Typography variant="body2">
          You can check patient prescription data, and set the prescription as delivered.
        </Typography>
      )}
      {role === "Random User" && (
        <Typography variant="body2">
          You can do nothing here.
        </Typography>
      )}
    </Box>
  );
}

export default AccountInfo;
