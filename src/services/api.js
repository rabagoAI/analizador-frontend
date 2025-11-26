import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeFile = async (fileContent, fileName, plan = 'free') => {
  try {
    console.log('📤 Enviando archivo al backend. Plan:', plan);
    
    const response = await api.post('/api/analyze', {
      fileContent,
      fileName,
      fileType: fileName.split('.').pop().toLowerCase(),
      plan: plan // ✅ Enviar el plan seleccionado
    });
    
    console.log('✅ Respuesta recibida:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('❌ Error en analyzeFile:', error);
    
    // ✅ Manejar ERRORES DE LÍMITES específicamente
    if (error.response?.status === 402) {
      throw new Error(`LIMIT_EXCEEDED:${JSON.stringify(error.response.data)}`);
    }
    
    if (error.response) {
      throw new Error(error.response.data.error || `Error del servidor: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor');
    } else {
      throw new Error('Error al configurar la petición: ' + error.message);
    }
  }
};

// ✅ Nuevo servicio para obtener planes
export const getPlans = async () => {
  try {
    const response = await api.get('/api/plans');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo planes:', error);
    throw error;
  }
};