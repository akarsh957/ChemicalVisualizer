import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, List, ListItem, ListItemText,
  Paper, Divider, CircularProgress, Alert, Button
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const API_URL = 'http://127.0.0.1:8000/api';

function History() {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('access_token');
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/history/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setHistoryList(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.detail || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDownloadPDF = async (reportId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/report/${reportId}/`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob',
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', `report_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);

    } catch (err) {
      console.error('PDF Download Error:', err);
      setError('Failed to download PDF.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
      <Typography variant="h5" gutterBottom>Upload History (Last 5)</Typography>
      <List>
        {historyList.length === 0 && (
          <ListItem>
            <ListItemText primary="No history found." />
          </ListItem>
        )}
        {historyList.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem
              secondaryAction={
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownloadPDF(item.id)}
                >
                  PDF
                </Button>
              }
            >
              <ListItemText
                primary={item.file_name}
                secondary={
                  `Uploaded: ${new Date(item.uploaded_at).toLocaleString()} | ` +
                  `Count: ${item.total_count} | ` +
                  `Avg. Flowrate: ${item.avg_flowrate}`
                }
              />
            </ListItem>
            {index < historyList.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

export default History;