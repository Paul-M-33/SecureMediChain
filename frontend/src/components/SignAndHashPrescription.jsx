import { useContractActions } from './ContractActionsComponent';
import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import * as futils from '../utils';
import MessageDialog from './MessageDialog';

const EthCrypto = require("eth-crypto");
const ethers = require('ethers');

function SignAndHashFile({ imageString, patientAddress, contractInstance }) {

  const { createNewPrescriptionData } = useContractActions(contractInstance);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success');

  const handleSignAndHashClick = async () => {
    if (imageString) {
      const hash = EthCrypto.hash.keccak256(futils.arrayBufferToHex(imageString));
      const dateInSecs = ethers.getBigInt(Math.floor(new Date().getTime() / 1000)); // number of seconds from Jan 1st, 1970, until now

      try {
        await createNewPrescriptionData(patientAddress, hash, dateInSecs);
        showDialog('success', 'Success', 'Hash and signature sent to blockchain successfully.');
      } catch (error) {
        showDialog('error', 'Error', `Error sending hash and signature to blockchain: ${error.message}`);
      }
    }
  };

  const showDialog = (type, title, message) => {
    setDialogType(type);
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Button variant="contained" onClick={handleSignAndHashClick}>
        <Typography variant="button">Send to Blockchain Prescription Hash and Signature</Typography>
      </Button>
      <MessageDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={dialogTitle} message={dialogMessage} type={dialogType} />
    </Box>
  );
}

export default SignAndHashFile;
