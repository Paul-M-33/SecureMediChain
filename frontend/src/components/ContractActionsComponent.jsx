/* implement blockchain interactions */

import React, { useState } from 'react';
import MessageDialog from './MessageDialog';

export let prescriptionData = [];

export const useContractActions = (contractInstance) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success'); // Default type is success

  const showDialog = (type, title, message) => {
    setDialogType(type);
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const addDoctor = async (doctorAddress) => {
    try {
      // Add doctor to whitelist
      const tx = await contractInstance.addDoctor(doctorAddress);
      await tx.wait(); // Wait for the transaction to be done
      showDialog('success', 'Success', `Doctor <span class="highlighted">${doctorAddress}</span> added successfully`);
    } catch (error) {
      if (error.code === 4001) {
        // User rejected the transaction
        showDialog('error', 'Transaction Rejected', 'You have rejected the transaction.');
      } else {
        showDialog('error', 'Error', `Error adding doctor: ${error.message}`);
      }
    }
  };

  const removeDoctor = async (doctorAddress) => {
    try {
      const tx = await contractInstance.removeDoctor(doctorAddress);
      await tx.wait();
      showDialog('success', 'Success', `Doctor <span class="highlighted">${doctorAddress}</span> removed successfully`);
    } catch (error) {
      if (error.code === 4001) {
        // User rejected the transaction
        showDialog('error', 'Transaction Rejected', 'You have rejected the transaction.');
      } else {
        showDialog('error', 'Error', `Error removing doctor: ${error.message}`);
      }
    }
  };
  
  const addPharmacist = async (pharmacistAddress) => {
    try {
      const tx = await contractInstance.addPharmacist(pharmacistAddress);
      await tx.wait();
      showDialog('success', 'Success', `Pharmacist <span class="highlighted">${pharmacistAddress}</span> added successfully`);
    } catch (error) {
      if (error.code === 4001) {
        // User rejected the transaction
        showDialog('error', 'Transaction Rejected', 'You have rejected the transaction.');
      } else {
        showDialog('error', 'Error', `Error adding pharmacist: ${error.message}`);
      }
    }
  };
  
  const removePharmacist = async (pharmacistAddress) => {
    try {
      const tx = await contractInstance.removePharmacist(pharmacistAddress);
      await tx.wait();
      showDialog('success', 'Success', `Pharmacist <span class="highlighted">${pharmacistAddress}</span> removed successfully`);
    } catch (error) {
      if (error.code === 4001) {
        // User rejected the transaction
        showDialog('error', 'Transaction Rejected', 'You have rejected the transaction.');
      } else {
        showDialog('error', 'Error', `Error removing pharmacist: ${error.message}`);
      }
    }
  };
  
  const createNewPrescriptionData = async (patientAddress, prescriptionHash, deliveryDate) => {
    try {
      const tx = await contractInstance.createNewPrescriptionData(patientAddress, prescriptionHash, deliveryDate);
      await tx.wait();
      showDialog('success', 'Success', 'Prescription data added to blockchain!');
    } catch (error) {
      if (error.code === 4001) {
        // User rejected the transaction
        showDialog('error', 'Transaction Rejected', 'You have rejected the transaction.');
      } else {
        showDialog('error', 'Error', `Error adding prescription data: ${error.message}`);
      }
    }
  };

  const checkDoctorWhitelist = async (doctorAddress) => {
    // Check if the doctor was added to the whitelist
    let doctorInWhitelist = await contractInstance.checkDoctorWhitelist(doctorAddress);

    return doctorInWhitelist;
  };

  const checkPharmacistWhitelist = async (pharmacistAddress) => {
    // Check if the doctor was added to the whitelist
    let pharmacistInWhitelist = await contractInstance.checkPharmacistWhitelist(pharmacistAddress);
    
    return pharmacistInWhitelist;
  };

  const getPrescriptionData = async (patientAddress) => {
    try {
      const data = await contractInstance.getPrescriptionData(patientAddress);
      prescriptionData = [data[0], data[1], data[2], data[3]];
      showDialog('success', 'Success', 'Prescription retrieved from blockchain!');
    } catch (error) {
      showDialog('error', 'Error', `Error getting prescription data: ${error.message}`);
    }
  };

  const setPrescriptionAsProcessed = async (patientAddress) => {
    try {
      const tx = await contractInstance.setPrescriptionAsProcessed(patientAddress);
      await tx.wait();
      showDialog('success', 'Success', 'Prescription set as processed!');
    } catch (error) {
      if (error.code === 4001) {
        // User rejected the transaction
        showDialog('error', 'Transaction Rejected', 'You have rejected the transaction.');
      } else {
        showDialog('error', 'Error', `Error changing prescription state: ${error.message}`);
      }
    }
  };

  return {
    addDoctor,
    removeDoctor,
    addPharmacist,
    removePharmacist,
    checkDoctorWhitelist,
    checkPharmacistWhitelist,
    createNewPrescriptionData,
    getPrescriptionData,
    setPrescriptionAsProcessed,
    dialogOpen,
    dialogTitle,
    dialogMessage,
    dialogType,
    setDialogOpen,
  };
};

const ContractActionsComponent = ({contractInstance}) => {
  const {
    addDoctor,
    removeDoctor,
    addPharmacist,
    removePharmacist,
    checkDoctorWhitelist,
    checkPharmacistWhitelist,
    createNewPrescriptionData,
    getPrescriptionData,
    setPrescriptionAsProcessed,
    dialogOpen,
    dialogTitle,
    dialogMessage,
    dialogType,
    setDialogOpen,
  } = useContractActions(contractInstance);

  return (
    <div>
      <MessageDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        title={dialogTitle} 
        message={dialogMessage} 
        type={dialogType} 
      />
    </div>
  );
};

export default ContractActionsComponent;
