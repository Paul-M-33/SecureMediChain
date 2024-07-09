import './App.css';
import React, { useState } from 'react';
import { useContractActions } from './ContractActionsComponent';
import { Button, Box } from '@mui/material';
import MessageDialog from './MessageDialog';
import { patientAddressExported } from './VerifyPrescriptionData';

function SetPrescriptionAsDelivered() {
  const { setPrescriptionAsProcessed } = useContractActions();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success');

  const handleButtonClick = async () => {
    try {
      await setPrescriptionAsProcessed(patientAddressExported);
      showDialog('success', 'Success', 'Prescription set as delivered successfully.');
    } catch (error) {
      showDialog('error', 'Error', `Error setting prescription as delivered: ${error.message}`);
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
      <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2 }}>
        Set Prescription as Delivered
      </Button>
      <MessageDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={dialogTitle} message={dialogMessage} type={dialogType} />
    </Box>
  );
}

export default SetPrescriptionAsDelivered;
