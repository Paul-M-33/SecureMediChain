import React, { useState } from 'react';
import { Typography, Button, Box, Alert } from '@mui/material';
import * as futils from './utils'

const EthCrypto = require("eth-crypto");

function VerifyPrescriptionData({ imageString, doctorPublicKey, prescriptionHashBC, prescriptionSignatureBC, setPrescriptionValid }) {
  const [alertMessage, setAlertMessage] = useState(null);

  const HandlePatientDataVerification = () => {

    let prescriptionValid = true;
    setPrescriptionValid(false);
    
    const prescriptionHashPharmaSide = EthCrypto.hash.keccak256(futils.arrayBufferToHex(imageString));

    // check hash
    if (prescriptionHashBC !== prescriptionHashPharmaSide) {
      setAlertMessage(<Alert severity="error">Hash verification failed. Prescription has been modified!</Alert>);
      prescriptionValid = false;
    }

    const signerPublicKey = EthCrypto.recoverPublicKey(prescriptionSignatureBC, prescriptionHashPharmaSide);

    // check prescription signature
    if (signerPublicKey !== doctorPublicKey) {
      setAlertMessage(<Alert severity="error">Signature verification failed. Prescription wasn't made by a doctor!</Alert>);
      prescriptionValid = false;
    }

    setAlertMessage(<Alert severity="success">Prescription is valid!</Alert>);
    
    if (prescriptionValid) {
      setPrescriptionValid(true);
    }
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Button variant="contained" onClick={HandlePatientDataVerification}>
        <Typography variant="button">Verify Prescription Data</Typography>
      </Button>
      {alertMessage}
    </Box>
  );
}

export default VerifyPrescriptionData;
