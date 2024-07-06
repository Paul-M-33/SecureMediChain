import React, { useState } from 'react';
import { Typography, Button, Box, Alert } from '@mui/material';
const EthCrypto = require("eth-crypto");

function VerifyPatientData({ imageStringPharmaSide, patientPrivateKeyHashBC, patientPrivateKeyHashToCheck, doctorPublicKey, prescriptionHashBC, prescriptionSignatureBC }) {
  const [alertMessage, setAlertMessage] = useState(null);

  // check patient private key hash
  const HandlePatientDataVerification = () => {
    if (patientPrivateKeyHashBC !== patientPrivateKeyHashToCheck) {
      setAlertMessage(<Alert severity="error">Patient public key is invalid. This prescription was not made for this patient!</Alert>);
      return false;
    }

    const prescriptionHashPharmaSide = EthCrypto.hash.keccak256(imageStringPharmaSide);

    // check hash
    if (prescriptionHashBC !== prescriptionHashPharmaSide) {
      setAlertMessage(<Alert severity="error">Hash verification failed. Prescription has been modified!</Alert>);
      return false;
    }

    const signerPublicKey = EthCrypto.recoverPublicKey(prescriptionSignatureBC, prescriptionHashPharmaSide);

    // check signature
    if (signerPublicKey !== doctorPublicKey) {
      setAlertMessage(<Alert severity="error">Signature verification failed. Prescription wasn't made by a doctor!</Alert>);
      return false;
    }

    setAlertMessage(<Alert severity="success">Prescription is valid!</Alert>);
    return true;
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Button variant="contained" onClick={HandlePatientDataVerification}>
        <Typography variant="button">Verify Patient Data</Typography>
      </Button>
      {alertMessage}
    </Box>
  );
}

export default VerifyPatientData;
