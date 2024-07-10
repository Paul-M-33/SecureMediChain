import { useContractActions } from './ContractActionsComponent';
import React, { useState } from 'react';
import { Typography, Button, Box, Alert } from '@mui/material';
import { prescriptionData } from './ContractActionsComponent';
import * as futils from './utils'

const EthCrypto = require("eth-crypto");

export let patientAddressExported = null;

function VerifyPrescriptionData({ imageString, doctorPublicKey, setPrescriptionValid, patientPublicKey }) {

  const { getPrescriptionData, checkDoctorWhitelist } = useContractActions();
  const [alertMessage, setAlertMessage] = useState(null);

  const HandlePatientDataVerification = async () => {

    let prescriptionValid = true;
    setPrescriptionValid(false);

    // patient public key => address for blockchain call :
    const patientAddress = EthCrypto.publicKey.toAddress(patientPublicKey);
    patientAddressExported = patientAddress;

    await getPrescriptionData(patientAddress);

    let prescriptionHashBC = prescriptionData[0];
    let prescriptionSignatureBC = prescriptionData[1];
    let hasBeenProcessed = prescriptionData[2];
    let prescriptionExist = prescriptionData[3];

    const doctorAddress = EthCrypto.publicKey.toAddress(doctorPublicKey);
    console.log("Doctor address is :"+doctorAddress);

    // loop to use break instructions to display the valid error message when needed
    for (let i = 0; i < 1; i++) {

      let doctorInWhiteList = await checkDoctorWhitelist(doctorAddress);
      
      if (!doctorInWhiteList) {
        setAlertMessage(<Alert severity="error">Doctor is not in whitelist !</Alert>);
        prescriptionValid = false;
        break;
      }

      if (!prescriptionExist) {
        setAlertMessage(<Alert severity="error">No prescription found for this patient address !</Alert>);
        prescriptionValid = false;
        break;
      }

      if (hasBeenProcessed) {
        setAlertMessage(<Alert severity="error">Prescription has already been delivered !</Alert>);
        prescriptionValid = false;
        break;
      }
      
      const prescriptionHashPharmaSide = EthCrypto.hash.keccak256(futils.arrayBufferToHex(imageString));

      // check hash
      if (prescriptionHashBC !== prescriptionHashPharmaSide) {
        setAlertMessage(<Alert severity="error">Hash verification failed. Prescription has been modified!</Alert>);
        prescriptionValid = false;
        break;
      }

      const signerPublicKey = EthCrypto.recoverPublicKey(prescriptionSignatureBC, prescriptionHashPharmaSide);

      // check prescription signature
      if (signerPublicKey !== doctorPublicKey) {
        setAlertMessage(<Alert severity="error">Signature verification failed. Prescription wasn't made by a doctor!</Alert>);
        prescriptionValid = false;
        break;
      }
    }
    
    if (prescriptionValid) {
      setPrescriptionValid(true);
      setAlertMessage(<Alert severity="success">Prescription is valid!</Alert>);
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
