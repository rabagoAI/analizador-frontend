import React, { useState } from 'react';
import {
  Container,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Box
} from '@mui/material';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import { Analytics } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Analytics sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Analizador de Costos de Materias Primas
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {!analysisData ? (
          <Box>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Analiza tus Archivos de Costos
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Sube tu archivo Excel o CSV y obtén análisis inteligente automático
            </Typography>
            <FileUpload onAnalysisComplete={handleAnalysisComplete} />
          </Box>
        ) : (
          <Dashboard data={analysisData} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;