import React from 'react';
import { Paper, Typography, Button, Box, Chip } from '@mui/material';
import { Check } from '@mui/icons-material';

const PlanSelector = ({ selectedPlan, onPlanSelect }) => {
  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      description: 'Para pruebas y uso ocasional',
      maxRecords: 100,
      price: 'Gratis',
      features: ['Hasta 100 registros', 'Análisis básico', 'Export CSV']
    },
    {
      id: 'autonomo',
      name: 'Autónomo',
      description: 'Perfecto para autónomos',
      maxRecords: 500,
      price: '€19/mes',
      features: ['Hasta 500 registros', 'Análisis completo', 'Export Excel', 'Soporte email']
    },
    {
      id: 'pyme', 
      name: 'PYME',
      description: 'Para pequeñas empresas',
      maxRecords: 2000,
      price: '€49/mes',
      features: ['Hasta 2,000 registros', 'Análisis avanzado', 'API básica', 'Soporte prioritario']
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Selecciona tu plan
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {plans.map(plan => (
          <Paper
            key={plan.id}
            sx={{
              p: 3,
              minWidth: 250,
              border: selectedPlan === plan.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
              backgroundColor: selectedPlan === plan.id ? '#f3f7ff' : 'white',
              cursor: 'pointer'
            }}
            onClick={() => onPlanSelect(plan.id)}
          >
            <Typography variant="h6" gutterBottom>
              {plan.name}
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              {plan.price}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {plan.description}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              📊 Hasta {plan.maxRecords.toLocaleString()} registros
            </Typography>
            <Box>
              {plan.features.map(feature => (
                <Box key={feature} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Check sx={{ fontSize: 16, color: 'green', mr: 1 }} />
                  <Typography variant="body2">{feature}</Typography>
                </Box>
              ))}
            </Box>
            {selectedPlan === plan.id && (
              <Chip 
                label="Seleccionado" 
                color="primary" 
                size="small" 
                sx={{ mt: 2 }}
              />
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default PlanSelector;