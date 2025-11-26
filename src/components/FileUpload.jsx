import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper, Typography, Box, LinearProgress, Alert, Button } from '@mui/material';
import { CloudUpload, Description } from '@mui/icons-material';

const FileUpload = ({ onDataProcessed }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploading(true);
    setUploadProgress(0);
    setUploadStatus('Procesando archivo...');

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const reader = new FileReader();
      
      reader.onload = (e) => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        try {
          const content = e.target.result;
          setUploadStatus('Procesando datos...');
          
          const rows = content.split('\n').filter(row => row.trim() !== '');
          
          if (rows.length <= 1) {
            setUploadStatus('Error: Archivo vacío o sin datos');
            setUploading(false);
            return;
          }

          const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
          const processedData = [];

          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const values = row.split(',').map(v => v.replace(/^"|"$/g, '').trim());
            
            if (values.length >= headers.length) {
              const item = {};
              let hasValidData = false;

              headers.forEach((header, j) => {
                let value = values[j] || '';
                
                if (header.includes('precio') || header.includes('costo')) {
                  value = parseFloat(value) || 0;
                  if (value > 0) hasValidData = true;
                } else if (header.includes('cantidad')) {
                  value = parseInt(value) || 1;
                }
                
                item[header] = value;
              });

              if (hasValidData) {
                processedData.push(item);
              }
            }
          }

          if (processedData.length === 0) {
            setUploadStatus('Error: No se encontraron datos válidos');
            setUploading(false);
            return;
          }

          setUploadStatus(`Éxito: ${processedData.length} registros procesados`);
          
          setTimeout(() => {
            onDataProcessed(processedData);
            setUploading(false);
            setUploadProgress(0);
          }, 1000);

        } catch (parseError) {
          console.error('Error parsing file:', parseError);
          setUploadStatus('Error: Formato de archivo no válido');
          setUploading(false);
        }
      };

      reader.onerror = () => {
        setUploadStatus('Error al leer el archivo');
        setUploading(false);
      };

      reader.readAsText(file);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Error en la carga del archivo');
      setUploading(false);
    }
  }, [onDataProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    multiple: false
  });

  return (
    <Box>
      <Paper
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          borderRadius: 3,
          p: 6,
          textAlign: 'center',
          cursor: uploading ? 'default' : 'pointer',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: uploading ? 'background.paper' : 'action.hover',
            borderColor: 'primary.main',
            transform: 'translateY(-2px)'
          }
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {isDragActive ? '¡Suelta el archivo aquí!' : 'Arrastra tu archivo CSV aquí'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          o haz clic para seleccionar un archivo
        </Typography>
        
        <Button 
          variant="contained" 
          size="large" 
          startIcon={<Description />}
          disabled={uploading}
        >
          Seleccionar Archivo
        </Button>
        
        {uploading && (
          <Box sx={{ mt: 4 }}>
            <LinearProgress 
              variant="determinate" 
              value={uploadProgress} 
              sx={{ mb: 2, height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {uploadStatus} {uploadProgress}%
            </Typography>
          </Box>
        )}
      </Paper>

      {uploadStatus && !uploading && (
        <Alert 
          severity={uploadStatus.includes('Error') ? 'error' : 'success'} 
          sx={{ mt: 3, borderRadius: 2 }}
        >
          {uploadStatus}
        </Alert>
      )}
    </Box>
  );
};

export default FileUpload;