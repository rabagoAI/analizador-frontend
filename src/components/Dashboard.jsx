import React from 'react';
import {
  Paper,
  Typography,
  Grid,  // ✅ Asegúrate de tener esta importación
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import Charts from './Charts';

const Dashboard = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">No hay datos para mostrar</Typography>
      </Paper>
    );
  }

  // Calcular métricas
  const totalRegistros = data.length;
  const costoTotal = data.reduce((sum, item) => sum + (item.precio_unitario * item.cantidad), 0);
  const proveedoresUnicos = [...new Set(data.map(item => item.proveedor).filter(Boolean))];

  return (
    <Grid container spacing={3}>
      {/* Métricas principales - CORREGIDO para MUI v6 */}
      <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {totalRegistros}
            </Typography>
            <Typography variant="body2">Total Registros</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="secondary">
              ${costoTotal.toLocaleString()}
            </Typography>
            <Typography variant="body2">Costo Total</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {proveedoresUnicos.length}
            </Typography>
            <Typography variant="body2">Proveedores</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid item xs={12} md={8}>
        <Charts data={data} />
      </Grid>

      {/* Top proveedores */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Top Proveedores
          </Typography>
          {proveedoresUnicos.slice(0, 5).map(proveedor => (
            <Chip 
              key={proveedor} 
              label={proveedor} 
              variant="outlined" 
              sx={{ m: 0.5 }} 
            />
          ))}
        </Paper>
      </Grid>

      {/* Tabla de datos */}
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Datos Normalizados
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Proveedor</TableCell>
                <TableCell align="right">Precio Unitario</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 10).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell>{row.descripcion_material}</TableCell>
                  <TableCell>{row.proveedor || 'N/A'}</TableCell>
                  <TableCell align="right">${row.precio_unitario}</TableCell>
                  <TableCell align="right">{row.cantidad || 1}</TableCell>
                  <TableCell align="right">
                    ${((row.precio_unitario || 0) * (row.cantidad || 1)).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Dashboard;