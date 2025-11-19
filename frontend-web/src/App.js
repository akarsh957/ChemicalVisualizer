import React, { useState } from 'react';
import './App.css';

// Material-UI Imports
import { 
  CssBaseline, 
  Container, 
  AppBar, 
  Toolbar, 
  Typography,
  Button 
} from '@mui/material';

// Component Imports
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Login from './components/Login';

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  
  // Check if a token exists in localStorage to determine initial login state
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

  const handleUploadSuccess = (data) => {
    setDashboardData(data);
    setError(null);
  };

  const handleUploadError = (err) => {
    setError(err);
    setDashboardData(null);
  };

  const handleLogout = () => {
    // 1. Remove the token from storage
    localStorage.removeItem('access_token');
    // 2. Update state to show the Login screen
    setIsLoggedIn(false);
    // 3. Clear any existing dashboard data
    setDashboardData(null);
    setError(null);
  };

  // --- RENDER: LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              Chemical Equipment Visualizer
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          {/* Pass the function to update state when login succeeds */}
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        </Container>
      </>
    );
  }

  // --- RENDER: MAIN APPLICATION ---
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chemical Equipment Parameter Visualizer
          </Typography>
          {/* Logout Button */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <main>
          <FileUpload 
            onUploadSuccess={handleUploadSuccess} 
            onUploadError={handleUploadError} 
          />
          
          {error && (
            <Typography color="error" variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
              Error: {error}
            </Typography>
          )}
          
          {/* Only show Dashboard if we have analysis data */}
          {dashboardData && <Dashboard data={dashboardData} />}

          {/* Always show History below */}
          <History />
        </main>
      </Container>
    </>
  );
}

export default App;