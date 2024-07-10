import './App.css';
import AccountInfo from './AccountInfo';
import UploadFile from './UploadFile';
import GetDoctorPublicKey from './GetDoctorPublicKey';
import GetDoctorPrivateKey from './GetDoctorPrivateKey';
import GetPatientAddress from './GetPatientAddress';
import GetPatientPublicKey from './GetPatientPublicKey';
import SignAndHashFile from './SignAndHashPrescription';
import RoleDropdown from './SelectRole';
import OwnerActions from './OwnerActions';
import VerifyPrescriptionData from './VerifyPrescriptionData';
import CheckPatientPublicKey from './CheckPatientPublicKey';
import SetPrescriptionAsDelivered from './SetPrescriptionAsDelivered';

import { Web3ConnectionButton } from './Connection';
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

import logo6 from './logo6.png';

const EthCrypto = require('eth-crypto');

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageString, setImageString] = useState(null);
  const [doctorPubK, setDoctorPublicKey] = useState(null);
  const [doctorPrivK, setDoctorPrivateKey] = useState(null);
  const [patientAddress, setPatientAddress] = useState(null);
  const [patientPublicKey, setPatientPublicKey] = useState(null);
  const [rdmNumber, setRdmNumber] = useState(null);
  const [patientPublicKeyValidity, setPatientPublicKeyValidity] = useState(false);
  const [prescriptionValid, setPrescriptionValid] = useState(false);
  const [role, setRole] = useState('');

  const [ownerAddress, setOwnerAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);

  const [isUserOwner, setIsUserOwner] = useState(false);
  const [isUserDoctor, setIsUserDoctor] = useState(false);
  const [isUserPharmacist, setIsUserPharmacist] = useState(false);
  
  // determine user priviledges based on his address
  useEffect(() => {
    const checkPrivileges = async () => {
      if (signer && ownerAddress && contractInstance) {
        const isOwner = (await signer.getAddress()) === ownerAddress;
        const doctorInWhiteList = await contractInstance.checkDoctorWhitelist(await signer.getAddress());
        const pharmacistInWhiteList = await contractInstance.checkPharmacistWhitelist(await signer.getAddress());

        setIsUserOwner(isOwner);
        setIsUserDoctor(doctorInWhiteList);
        setIsUserPharmacist(pharmacistInWhiteList);
      }
    };

    checkPrivileges();
  }, [signer, ownerAddress, contractInstance]);

  // TODO : delete the following lines (useful for tests only)
  const privateKeyHardhat2 = "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

  useEffect(() => {
    if (rdmNumber) {
      const hashChallenge = EthCrypto.hash.keccak256(rdmNumber.toString());
      const signature = EthCrypto.sign(privateKeyHardhat2, hashChallenge);
      console.log("patient signature to find to authentify public key:", signature);
    }
  }, [rdmNumber]);

  useEffect(() => {
    setImageString(null);
    setSelectedImage(null);
    setPrescriptionValid(false);
  }, [role]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <img src={logo6} alt="Logo" style={{ maxWidth: '300px', marginRight: '20px' }} />
          <Typography variant="h4" component="h1" gutterBottom>
            SecureMediChain
          </Typography>
        </Box>
        <RoleDropdown setRole={setRole} />
      </Box>
      <Web3ConnectionButton setOwnerAddress={setOwnerAddress} setSigner={setSigner} setContractInstance={setContractInstance} />
      <AccountInfo role={role} />

      {role === "Owner" && isUserOwner && (
        <Box sx={{ my: 4 }}>
          <OwnerActions contractInstance={contractInstance}/>
        </Box>
      )}

      {((role === "Doctor" && isUserDoctor) || (role === "Pharmacist" && isUserPharmacist)) && (
        <div>
          <Box sx={{ my: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Upload a Prescription
            </Typography>
            <UploadFile setImageString={setImageString} setSelectedImage={setSelectedImage} />
            {selectedImage && (
              <Paper sx={{ p: 2, my: 2 }}>
                <Typography variant="h6">Selected prescription:</Typography>
                <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '400px' }} />
              </Paper>
            )}
          </Box>
        </div>
      )}

      {role === "Doctor" && isUserDoctor && (
        <div>
          <Box sx={{ my: 4 }}>
            <GetDoctorPrivateKey setDotorPrivateKey={setDoctorPrivateKey} />
          </Box>
          <Box sx={{ my: 4 }}>
            <GetPatientAddress setPatientAddress={setPatientAddress} />
          </Box>
        </div>
      )}

      {role === "Doctor" && isUserDoctor && doctorPrivK && imageString && patientAddress && (
        <Box sx={{ my: 4 }}>
          <SignAndHashFile
            imageString={imageString}
            doctorPrivK={doctorPrivK}
            patientAddress={patientAddress}
            contractInstance={contractInstance}
          />
        </Box>
      )}

      {role === "Pharmacist" && isUserPharmacist && (
        <div>
          <Box sx={{ my: 4 }}>
            <GetPatientPublicKey setPatientPublicKey={setPatientPublicKey} />
          </Box>
          {patientPublicKey && (
            <div>
              <CheckPatientPublicKey setRdmNumber={setRdmNumber} patientPublicKey={patientPublicKey} setPatientPublicKeyValidity={setPatientPublicKeyValidity} />
              <Box sx={{ my: 4 }}></Box>
            </div>
          )}
          <div>
            <GetDoctorPublicKey setDoctorPublicKey={setDoctorPublicKey} />
            <Box sx={{ my: 4 }}></Box>
          </div>
          {patientPublicKeyValidity && doctorPubK && (
            <Box sx={{ my: 4 }}>
              <VerifyPrescriptionData
                imageString={imageString}
                doctorPublicKey={doctorPubK}
                setPrescriptionValid={setPrescriptionValid}
                patientPublicKey={patientPublicKey}
                contractInstance={contractInstance}
              />
            </Box>
          )}
          {prescriptionValid &&
            <Box sx={{ my: 4 }}>
              <SetPrescriptionAsDelivered contractInstance={contractInstance}/>
            </Box>
          }
        </div>
      )}
    </Container>
  );
}

export default App;
