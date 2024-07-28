import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box, Alert } from '@mui/material';
import random from 'random';

const EthCrypto = require("eth-crypto");

const MIN_CHALLENGE = 1;
const MAX_CHALLENGE = 100;

function CheckPatientPublicKey({ setRdmNumber, patientPublicKey, setPatientPublicKeyValidity }) {
  const [challenge, setChallenge] = useState(null);
  const [textArea, setTextArea] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [hashChallenge, setHashChallenge] = useState(null);

  // when challenge is (re)-generated, patient has to provide a new valid signature
  useEffect(() => {
    if (challenge) {
      const hash = EthCrypto.hash.keccak256(challenge.toString());
      setHashChallenge(hash);
    }
  }, [challenge]);

  const HandleChallengeGeneration = () => {
    const challenge = random.int(MIN_CHALLENGE, MAX_CHALLENGE); // uniform integer in [min, max]
    setChallenge(challenge);
    setRdmNumber(challenge);
  };

  const handleTextChange = (event) => {
    setTextArea(event.target.value);
  };

  const CheckPatientSignature = () => {
    try {
      const patientPublicKeySigner = EthCrypto.recoverPublicKey(textArea, hashChallenge);
      /* TODO : add 0x to patientPublicKeySigner to be consistent with other key/addresses passed */

      if (patientPublicKey !== patientPublicKeySigner) {
        setAlertMessage(<Alert severity="error">Signature verification failed. The verification does not match the patient's public key!</Alert>);
      } else {
        setAlertMessage(<Alert severity="success">Signature verification successful. The verification matches the patient's public key!</Alert>);
        setPatientPublicKeyValidity(true);
      }
    } catch (error) {
      setAlertMessage(<Alert severity="error">Signature verification failed. Invalid signature format!</Alert>);
    }
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Button variant="contained" onClick={HandleChallengeGeneration}>
        <Typography variant="button">Check patient public key : Generate and send challenge</Typography>
      </Button>
      {challenge && (
        <div>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Generated Challenge: {challenge}
          </Typography>
          <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
            <Typography variant="h6" gutterBottom>
              Enter Patient Signature
            </Typography>
            <TextField
              value={textArea}
              onChange={handleTextChange}
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="Enter patient signature"
            />
            {textArea && (
              <Button variant="contained" onClick={CheckPatientSignature} sx={{ mt: 2 }}>
                Check patient signature
              </Button>
            )}
            {alertMessage && (
              <Box sx={{ mt: 2 }}>
                {alertMessage}
              </Box>
            )}
          </Box>
        </div>
      )}
    </Box>
  );
}

export default CheckPatientPublicKey;