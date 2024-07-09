/* implement all functions related to smart contract interactions */

import { ethers } from 'ethers';
import { exportedSigner } from './Connection';
import contractAbi from './contracts/SecureMediChainABI.json';

/* replace with contract address*/
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const getContract = () => {
  if (!exportedSigner) {
    throw new Error("Signer is not available. Make sure the wallet is connected.");
  }
  return new ethers.Contract(contractAddress, contractAbi, exportedSigner);
};

export const addDoctor = async (doctorAddress) => {
  const contract = getContract();
  try {
    const tx = await contract.addDoctor(doctorAddress);
    await tx.wait();
    console.log(`Doctor ${doctorAddress} added successfully`);
  } catch (error) {
    console.error("Error adding doctor:", error);
  }
};

export const removeDoctor = async (doctorAddress) => {
  const contract = getContract();
  try {
    const tx = await contract.removeDoctor(doctorAddress);
    await tx.wait();
    console.log(`Doctor ${doctorAddress} removed successfully`);
  } catch (error) {
    console.error("Error removing doctor:", error);
  }
};

export const addPharmacist = async (pharmacistAddress) => {
  const contract = getContract();
  try {
    console.log(contract);
    console.log(exportedSigner);
    const tx = await contract.addPharmacist(pharmacistAddress);
    await tx.wait();
    console.log(`Pharmacist ${pharmacistAddress} added successfully`);
  } catch (error) { 
    console.error("Error adding pharmacist:", error);
  }
};

export const removePharmacist = async (pharmacistAddress) => {
  const contract = getContract();
  try {
    const tx = await contract.removePharmacist(pharmacistAddress);
    await tx.wait();
    console.log(`Pharmacist ${pharmacistAddress} removed successfully`);
  } catch (error) {
    console.error("Error removing pharmacist:", error);
  }
};