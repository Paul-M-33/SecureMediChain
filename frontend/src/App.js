import './App.css';
import AccountInfo from './AccountInfo';
import Web3ConnectionButton from './Connection';
import UploadFile from './UploadFile';
import GetDoctorPrivateKey from './GetDoctorPrivateKey';
import GetPatientPrivateKeyHash from './GetPatientPrivateKeyHash';
import SignAndHashFile from './SignAndHashPrescription';
import RoleDropdown from './SelectRole';
import OwnerActions from './OwnerActions';
import VerifyPatientData from './VerifyPatientData';

import { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import logo from './logo.png';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageString, setImageString] = useState(null);
  const [prescriptionSigned, setPrescriptionSigned] = useState(null);
  const [prescriptionHash, setPrescriptionHash] = useState(null);
  const [doctorPrivK, setDoctorPrivateKey] = useState(null);
  const [patientPrivateKeyHash, setpatientPrivateKeyHash] = useState(null);
  const [role, setRole] = useState('');

  let patientPublicKey = "70997970C51812dc3A010C7d01b50e0d17dc79C8";
  let doctorPublicKey = "9d9031e97dd78ff8c15aa86939de9b1e791066a0224e331bc962a2099a7b1f0464b8bbafe1535f2301c72c2cb3535b172da30b02686ab0393d348614f157fbdb"

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

      {role === "Doctor" && (
        <Box sx={{ my: 4 }}>
          <GetDoctorPrivateKey setDotorPrivateKey={setDoctorPrivateKey} />
        </Box>
      )}

      {(role === "Doctor" || role === "Pharmacist") && (
        <div>
        <Box sx={{ my: 4 }}>
        <GetPatientPrivateKeyHash setpatientPrivateKeyHash={setpatientPrivateKeyHash} />
      </Box>
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

      {role === "Doctor" && doctorPrivK && (
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
        <Box sx={{ my: 4 }}>
          <VerifyPatientData
            /*
            TODO : change with valid parameters. Those are for testing */
            imageStringPharmaSide={imageString}
            patientPrivateKeyHashBC={patientPublicKey}
            patientPrivateKeyHashToCheck={patientPublicKey}
            doctorPublicKey={doctorPublicKey}
            prescriptionHashBC={prescriptionHash}
            prescriptionSignatureBC={prescriptionSigned}
          />
        </Box>
      )}
    </Container>
  );
}

export default App;
