import '../App.css';
import React from 'react';
import { Button, Box, Paper } from '@mui/material';

function UploadFile({ setImageString, setSelectedImage }) {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        setImageString(arrayBuffer);
        setSelectedImage(URL.createObjectURL(file));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Box sx={{ my: 4, backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </Button>
      </Paper>
    </Box>
  );
}

export default UploadFile;
