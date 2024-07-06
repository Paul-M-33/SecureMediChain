import './App.css';
import React from 'react';
import { Button, Box } from '@mui/material';

function UploadFile({ setImageString, setSelectedImage }) {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        setSelectedImage(URL.createObjectURL(file));
        setImageString(arrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" accept="image/*" onChange={handleImageChange} hidden />
      </Button>
    </Box>
  );
}

export default UploadFile;
