import React from 'react';
import { Typography, Button, Box } from '@mui/material';
const EthCrypto = require("eth-crypto");

function SignAndHashFile({ imageString, doctorPrivK, setPrescriptionSigned, setPrescriptionHash }) {
  const handleSignAndHashClick = () => {
    if (imageString && doctorPrivK) {
      const privateKey = doctorPrivK.toString("hex");
      const hash = EthCrypto.hash.keccak256(imageString);
      const signature = EthCrypto.sign(privateKey, hash);

      setPrescriptionSigned(signature);
      setPrescriptionHash(hash);
    }
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Button variant="contained" onClick={handleSignAndHashClick}>
        <Typography variant="button">Sign and Hash Prescription</Typography>
      </Button>
    </Box>
  );
}

export default SignAndHashFile;
