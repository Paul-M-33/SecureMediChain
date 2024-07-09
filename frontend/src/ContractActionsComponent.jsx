/* implement blockchain interactions */

import { ethers } from 'ethers';
import { exportedSigner } from './Connection';
import contractAbi from './contracts/SecureMediChainABI.json';
import React, { useState } from 'react';
import MessageDialog from './MessageDialog';

let contractInstance;

/* Replace with contract address */
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export let prescriptionData = [];

export const getContract = () => {
  if (!exportedSigner) {
    throw new Error("Signer is not available. Make sure the wallet is connected.");
  }
  
  if (!contractInstance) {
    // Create the contract instance only if it doesn't exist
    contractInstance = new ethers.Contract(contractAddress, contractAbi, exportedSigner);
  }

  return contractInstance;
};

export const useContractActions = () => {
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
    const contract = getContract();
    try {
      const tx = await contract.addDoctor(doctorAddress);
      await tx.wait();
      showDialog('success', 'Success', `Doctor <span class="highlighted">${doctorAddress}</span> added successfully`);
    } catch (error) {
      showDialog('error', 'Error', `Error adding doctor: ${error.message}`);
    }
  };

  const removeDoctor = async (doctorAddress) => {
    const contract = getContract();
    try {
      const tx = await contract.removeDoctor(doctorAddress);
      await tx.wait();
      showDialog('success', 'Success', `Doctor <span class="highlighted">${doctorAddress}</span> removed successfully`);
    } catch (error) {
      showDialog('error', 'Error', `Error removing doctor: ${error.message}`);
    }
  };

  const addPharmacist = async (pharmacistAddress) => {
    const contract = getContract();
    try {
      const tx = await contract.addPharmacist(pharmacistAddress);
      await tx.wait();
      showDialog('success', 'Success', `Pharmacist <span class="highlighted">${pharmacistAddress}</span> added successfully`);
    } catch (error) {
      showDialog('error', 'Error', `Error adding pharmacist: ${error.message}`);
    }
  };

  const removePharmacist = async (pharmacistAddress) => {
    const contract = getContract();
    try {
      const tx = await contract.removePharmacist(pharmacistAddress);
      await tx.wait();
      showDialog('success', 'Success', `Pharmacist <span class="highlighted">${pharmacistAddress}</span> removed successfully`);
    } catch (error) {
      showDialog('error', 'Error', `Error removing pharmacist: ${error.message}`);
    }
  };

  const createNewPrescriptionData = async (patientAddress, prescriptionSignature, prescriptionHash) => {
    const contract = getContract();
    try {
      const tx = await contract.createNewPrescriptionData(patientAddress, prescriptionSignature, prescriptionHash);
      await tx.wait();
      showDialog('success', 'Success', 'Prescription data added to blockchain!');
    } catch (error) {
      showDialog('error', 'Error', `Error adding prescription data: ${error.message}`);
    }
  };

  const getPrescriptionData = async (patientAddress) => {
    const contract = getContract();
    try {
      const data = await contract.getPrescriptionData(patientAddress);
      prescriptionData = [data[0], data[1], data[2], data[3]];
      showDialog('success', 'Success', 'Prescription retrieved from blockchain!');
    } catch (error) {
      showDialog('error', 'Error', `Error getting prescription data: ${error.message}`);
    }
  };

  const setPrescriptionAsProcessed = async (patientAddress) => {
    const contract = getContract();
    try {
      const tx = await contract.setPrescriptionAsProcessed(patientAddress);
      await tx.wait();
      showDialog('success', 'Success', 'Prescription set as processed!');
    } catch (error) {
      showDialog('error', 'Error', `Error changing prescription state: ${error.message}`);
    }
  };

  return {
    addDoctor,
    removeDoctor,
    addPharmacist,
    removePharmacist,
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

const ContractActionsComponent = () => {
  const {
    addDoctor,
    removeDoctor,
    addPharmacist,
    removePharmacist,
    createNewPrescriptionData,
    getPrescriptionData,
    setPrescriptionAsProcessed,
    dialogOpen,
    dialogTitle,
    dialogMessage,
    dialogType,
    setDialogOpen,
  } = useContractActions();

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
