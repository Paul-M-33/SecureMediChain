import React, {useState} from 'react';
import { Typography, Button, Box, Alert } from '@mui/material';
import * as futils from './utils'

const EthCrypto = require("eth-crypto");

function SignAndHashFile({ imageString, doctorPrivK, setPrescriptionSigned, setPrescriptionHash }) {

  const [isDone, setIsDone] = useState(false);

  const handleSignAndHashClick = () => {
    if (imageString && doctorPrivK) {
      const privateKey = doctorPrivK.toString("hex");
      const hash = EthCrypto.hash.keccak256(futils.arrayBufferToHex(imageString));
      const signature = EthCrypto.sign(privateKey, hash);

      setPrescriptionSigned(signature);
      setPrescriptionHash(hash);

      setIsDone(true);
      setTimeout(() => setIsDone(false), 3000); // Hide "Done" message after 3 seconds
    }
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Button variant="contained" onClick={handleSignAndHashClick}>
        <Typography variant="button">Sign and Hash Prescription</Typography>
      </Button>
      {isDone && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="success">Done</Alert>
        </Box>
      )}
    </Box>
  );

}

export default SignAndHashFile;
