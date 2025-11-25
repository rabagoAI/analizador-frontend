import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid  // ✅ AGREGAR ESTA IMPORTACIÓN
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ data }) => {
  // Preparar datos para gráficos
  const costosPorMes = {};
  const costosPorProveedor = {};
  const materialesCount = {};

  data.forEach(item => {
    // Gráfico de costos por mes
    const mes = item.fecha ? item.fecha.substring(0, 7) : 'Sin fecha';
    const costo = (item.precio_unitario || 0) * (item.cantidad || 1);
    costosPorMes[mes] = (costosPorMes[mes] || 0) + costo;

    // Gráfico de costos por proveedor
    const proveedor = item.proveedor || 'Sin proveedor';
    costosPorProveedor[proveedor] = (costosPorProveedor[proveedor] || 0) + costo;

    // Gráfico de materiales
    const material = item.descripcion_material || 'Sin descripción';
    materialesCount[material] = (materialesCount[material] || 0) + 1;
  });

  const barChartData = {
    labels: Object.keys(costosPorMes),
    datasets: [
      {
        label: 'Costos por Mes',
        data: Object.values(costosPorMes),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(costosPorProveedor).slice(0, 5),
    datasets: [
      {
        data: Object.values(costosPorProveedor).slice(0, 5),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Análisis Visual
      </Typography>
      
      <Grid container spacing={2}>  {/* ✅ AHORA Grid ESTÁ DEFINIDO */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Costos por Mes
            </Typography>
            <Bar data={barChartData} options={options} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Distribución por Proveedor
            </Typography>
            <Doughnut data={doughnutData} options={options} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Charts;