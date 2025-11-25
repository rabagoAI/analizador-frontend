import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Paper, 
  Typography, 
  Button, 
  Box,
  Alert,
  CircularProgress 
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { analyzeFile } from '../services/api';

const FileUpload = ({ onAnalysisComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const processFile = async (file) => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Procesando archivo:', file.name, file.type);
      const data = await readFileContent(file);
      console.log('Contenido leído, enviando al backend...');
      const analysisResult = await analyzeFile(data, file.name);
      onAnalysisComplete(analysisResult);
    } catch (err) {
      console.error('Error en processFile:', err);
      setError(err.message || 'Error al procesar el archivo');
    } finally {
      setIsLoading(false);
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          console.log('Archivo leído, tipo:', file.type);
          
          if (file.name.endsWith('.csv') || file.type === 'text/csv') {
            // Para CSV, usar el texto directamente
            resolve(data);
          } else {
            // Para Excel, convertir a CSV
            const workbook = XLSX.read(data, { 
              type: file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? 'array' : 'binary' 
            });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const csvData = XLSX.utils.sheet_to_csv(worksheet);
            console.log('Excel convertido a CSV, longitud:', csvData.length);
            resolve(csvData);
          }
        } catch (error) {
          console.error('Error en onload:', error);
          reject(new Error('Error al leer el contenido del archivo'));
        }
      };
      
      reader.onerror = (error) => {
        console.error('Error del FileReader:', error);
        reject(new Error('Error al leer el archivo'));
      };
      
      reader.onabort = () => {
        reject(new Error('Lectura del archivo cancelada'));
      };

      // Determinar cómo leer el archivo basado en su tipo
      if (file.name.endsWith('.csv') || file.type === 'text/csv') {
        reader.readAsText(file, 'UTF-8');
      } else if (file.name.endsWith('.xlsx') || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        reader.readAsArrayBuffer(file);
      } else {
        // Para .xls y otros formatos
        reader.readAsBinaryString(file);
      }
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        textAlign: 'center',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        cursor: isLoading ? 'wait' : 'pointer'
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} disabled={isLoading} />
        <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        
        {isLoading ? (
          <>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Procesando archivo...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Esto puede tomar unos segundos
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Suelta el archivo aquí' : 'Arrastra tu archivo aquí'}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              o haz clic para seleccionar
            </Typography>
            
            <Typography variant="caption" color="text.secondary">
              Formatos soportados: Excel (.xlsx, .xls) y CSV
            </Typography>
            
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              Seleccionar Archivo
            </Button>
          </>
        )}
      </div>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default FileUpload;