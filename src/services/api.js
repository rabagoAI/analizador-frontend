import axios from 'axios';

// Esta URL será la de tu Cloud Function desplegada
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const analyzeFile = async (fileContent, fileName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/analyze`, {
      fileContent,
      fileName,
      fileType: fileName.split('.').pop().toLowerCase()
    });
    
    return response.data;
  } catch (error) {
    console.error('Error analyzing file:', error);
    throw new Error(error.response?.data?.error || 'Error al analizar el archivo');
  }
};