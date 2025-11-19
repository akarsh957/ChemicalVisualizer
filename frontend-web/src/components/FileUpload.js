import React, { useState }from 'react';
import axios from 'axios';
import { Button, Box, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const API_URL = 'http://127.0.0.1:8000/api';

function FileUpload({ onUploadSuccess, onUploadError }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    onUploadError(null);
    const token = localStorage.getItem('access_token');
    
    try {
      const response = await axios.post(`${API_URL}/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      onUploadSuccess(response.data);
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.detail || err.message;
      onUploadError(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2,
        p: 3,
        border: '2px dashed #ccc',
        borderRadius: '8px'
      }}
    >
      <Button
        component="label"
        variant="contained"
        startIcon={<UploadFileIcon />}
      >
        Select CSV File
        <input 
          type="file" 
          accept=".csv" 
          hidden 
          onChange={handleFileChange} 
        />
      </Button>
      <Typography variant="body1">{fileName}</Typography>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AnalyticsIcon />}
        onClick={handleUpload}
        disabled={!file || uploading}
        size="large"
      >
        {uploading ? 'Analyzing...' : 'Upload & Analyze'}
      </Button>
    </Box>
  );
}

export default FileUpload;