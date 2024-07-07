import './App.css';
import AccountInfo from './AccountInfo';
import Web3ConnectionButton from './Connection';
import UploadFile from './UploadFile';
import GetDoctorPublicKey from './GetDoctorPublicKey';
import GetDoctorPrivateKey from './GetDoctorPrivateKey';
import GetPatientPublicKey from './GetPatientPublicKey';
import SignAndHashFile from './SignAndHashPrescription';
import RoleDropdown from './SelectRole';
import OwnerActions from './OwnerActions';
import VerifyPrescriptionData from './VerifyPrescriptionData';
import CheckPatientPublicKey from './CheckPatientPublicKey';

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import logo from './logo.png';

const EthCrypto = require('eth-crypto');

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageString, setImageString] = useState(null);
  const [prescriptionSigned, setPrescriptionSigned] = useState(null);
  const [prescriptionHash, setPrescriptionHash] = useState(null);
  const [doctorPubK, setDoctorPublicKey] = useState(null);
  const [doctorPrivK, setDoctorPrivateKey] = useState(null);
  const [patientPublicKey, setPatientPublicKey] = useState(null);
  const [rdmNumber, setRdmNumber] = useState(null);
  const [patientPublicKeyValidity, setPatientPublicKeyValidity] = useState(false);
  const [role, setRole] = useState('');

  // TODO : delete this line (useful for tests only)
  let privateKeyHardhat2 = "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

  useEffect(() => {
    if (rdmNumber) {
      const hashChallenge = EthCrypto.hash.keccak256(rdmNumber.toString());
      const signature = EthCrypto.sign(privateKeyHardhat2, hashChallenge);
      console.log("patient signature to find to authentify public key:", signature);
    }
  }, [rdmNumber, privateKeyHardhat2]);

  useEffect(() => {
    setImageString(null);
    setSelectedImage(null);
  }, [role]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <img src={logo} alt="Logo" style={{ maxWidth: '200px', marginRight: '20px' }} />
          <Typography variant="h4" component="h1" gutterBottom>
            SecureMediChain
          </Typography>
        </Box>
        <RoleDropdown setRole={setRole} />
      </Box>
      <Web3ConnectionButton />
      <AccountInfo role={role} />

      {role === "Owner" && (
        <Box sx={{ my: 4 }}>
          <OwnerActions />
        </Box>
      )}

      {(role === "Doctor" || role === "Pharmacist") && (
        <div>
          <Box sx={{ my: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Upload a Prescription
            </Typography>
            <UploadFile setImageString={setImageString} setSelectedImage={setSelectedImage}/>
            {selectedImage && (
              <Paper sx={{ p: 2, my: 2 }}>
                <Typography variant="h6">Selected prescription:</Typography>
                <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '400px' }} />
              </Paper>
            )}
          </Box>
        </div>
      )}

      {role === "Doctor" && (
        <div>
          <Box sx={{ my: 4 }}>
          <GetDoctorPrivateKey setDotorPrivateKey={setDoctorPrivateKey} />
          </Box>
          <Box sx={{ my: 4 }}>
            <GetPatientPublicKey setPatientPublicKey={setPatientPublicKey} />
          </Box>
        </div>
      )}

      {role === "Doctor" && doctorPrivK && imageString && (
        <Box sx={{ my: 4 }}>
          <SignAndHashFile
            imageString={imageString}
            doctorPrivK={doctorPrivK}
            setPrescriptionSigned={setPrescriptionSigned}
            setPrescriptionHash={setPrescriptionHash}
          />
        </Box>
      )}

      {role === "Pharmacist" && (
        <div>
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
                prescriptionHashBC={prescriptionHash}
                prescriptionSignatureBC={prescriptionSigned}
              />
            </Box>
          )}
        </div>
      )}
    </Container>
  );
}

export default App;
