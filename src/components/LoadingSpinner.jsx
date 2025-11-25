import React from 'react';
import {
  Backdrop,
  CircularProgress,
  Typography,
  Box
} from '@mui/material';

const LoadingSpinner = ({ open, message }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }}
      open={open}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <CircularProgress 
          color="inherit" 
          size={60}
          thickness={4}
        />
        <Typography variant="h6" component="div">
          {message || 'Procesando...'}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Esto puede tomar unos segundos
        </Typography>
      </Box>
    </Backdrop>
  );
};

// Versión alternativa más simple para usar inline
export const InlineSpinner = ({ size = 40, message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 3
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

// Versión para botones o elementos pequeños
export const SmallSpinner = ({ size = 20, color = 'inherit' }) => {
  return (
    <CircularProgress 
      size={size} 
      color={color}
      sx={{ ml: 1 }}
    />
  );
};

export default LoadingSpinner;