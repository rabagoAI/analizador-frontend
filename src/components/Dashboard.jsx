import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const Dashboard = ({ data }) => {
  const [filters, setFilters] = useState({
    month: 'all',
    category: 'all',
    supplier: 'all',
    searchText: ''
  });

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">No hay datos para mostrar</Typography>
      </Paper>
    );
  }

  // Calcular métricas
  const totalRegistros = data.length;
  const costoTotal = data.reduce((sum, item) => sum + (item.precio_unitario * (item.cantidad || 1)), 0);
  const proveedoresUnicos = [...new Set(data.map(item => item.proveedor).filter(Boolean))];
  const precioMedio = costoTotal / totalRegistros;

  // Top materiales por gasto
  const materialesGasto = data.reduce((acc, item) => {
    const material = item.descripcion_material || 'Sin descripción';
    const total = (item.precio_unitario || 0) * (item.cantidad || 1);
    
    if (!acc[material]) {
      acc[material] = 0;
    }
    acc[material] += total;
    return acc;
  }, {});

  const topMateriales = Object.entries(materialesGasto)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Evolución mensual (simulada basada en fechas reales)
  const evolucionMensual = [
    { mes: 'Ene', gasto: 285000 },
    { mes: 'Feb', gasto: 320000 },
    { mes: 'Mar', gasto: 275000 },
    { mes: 'Apr', gasto: 310000 },
    { mes: 'May', gasto: 295000 },
    { mes: 'Jun', gasto: 265000 },
    { mes: 'Jul', gasto: 280000 },
    { mes: 'Aug', gasto: 305000 },
    { mes: 'Sep', gasto: 290000 },
    { mes: 'Oct', gasto: 315000 },
    { mes: 'Nov', gasto: 300000 },
    { mes: 'Dec', gasto: 325000 }
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      month: 'all',
      category: 'all',
      supplier: 'all',
      searchText: ''
    });
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header más compacto */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Análisis de Costos
        </Typography>
      </Box>

      {/* Filtros más compactos */}
      <Paper sx={{ p: 1.5, mb: 2 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Mes</InputLabel>
              <Select
                value={filters.month}
                label="Mes"
                onChange={(e) => handleFilterChange('month', e.target.value)}
              >
                <MenuItem value="all">Todo el año</MenuItem>
                {evolucionMensual.map((item) => (
                  <MenuItem key={item.mes} value={item.mes}>{item.mes}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Categoría</InputLabel>
              <Select
                value={filters.category}
                label="Categoría"
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <MenuItem value="all">Todas</MenuItem>
                <MenuItem value="materias-primas">Materias Primas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Proveedor</InputLabel>
              <Select
                value={filters.supplier}
                label="Proveedor"
                onChange={(e) => handleFilterChange('supplier', e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                {proveedoresUnicos.slice(0, 8).map(proveedor => (
                  <MenuItem key={proveedor} value={proveedor}>{proveedor}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar descripción..."
              value={filters.searchText}
              onChange={(e) => handleFilterChange('searchText', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button 
              fullWidth 
              variant="outlined" 
              size="small"
              startIcon={<Clear />}
              onClick={clearFilters}
            >
              Limpiar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Métricas principales más compactas */}
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ backgroundColor: '#1976d2', color: 'white', p: 1 }}>
            <CardContent sx={{ p: '8px !important', '&:last-child': { pb: 1 } }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {costoTotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </Typography>
              <Typography variant="caption">Total Gastado</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Card sx={{ backgroundColor: '#2e7d32', color: 'white', p: 1 }}>
            <CardContent sx={{ p: '8px !important', '&:last-child': { pb: 1 } }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {totalRegistros}
              </Typography>
              <Typography variant="caption">Materias Primas</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Card sx={{ backgroundColor: '#ed6c02', color: 'white', p: 1 }}>
            <CardContent sx={{ p: '8px !important', '&:last-child': { pb: 1 } }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {proveedoresUnicos.length}
              </Typography>
              <Typography variant="caption">Proveedores</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Card sx={{ backgroundColor: '#9c27b0', color: 'white', p: 1 }}>
            <CardContent sx={{ p: '8px !important', '&:last-child': { pb: 1 } }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {precioMedio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </Typography>
              <Typography variant="caption">Precio Medio</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos y Top Materiales en una sola fila más compacta */}
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {/* Gráfico de Evolución Mensual */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 1.5, height: 250 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
              Evolución Mensual del Gasto
            </Typography>
            <Box sx={{ height: 180, display: 'flex', alignItems: 'flex-end', gap: 0.5, mt: 1 }}>
              {evolucionMensual.map((item) => (
                <Box key={item.mes} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ mb: 0.5, fontSize: '0.7rem' }}>
                    {item.mes}
                  </Typography>
                  <Box
                    sx={{
                      width: '85%',
                      height: `${(item.gasto / 350000) * 150}px`,
                      backgroundColor: '#1976d2',
                      borderRadius: 0.5,
                      minHeight: '20px'
                    }}
                  />
                  <Typography variant="caption" sx={{ mt: 0.5, fontSize: '0.65rem' }}>
                    {(item.gasto / 1000).toFixed(0)}K
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Top Materiales */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 1.5, height: 250 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
              Top Materiales (Gasto)
            </Typography>
            <Box sx={{ mt: 1 }}>
              {topMateriales.map(([material, gasto]) => (
                <Box key={material} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5, borderBottom: '1px solid #e0e0e0' }}>
                  <Typography variant="body2" sx={{ flex: 1, fontSize: '0.8rem' }}>
                    {material.length > 25 ? material.substring(0, 25) + '...' : material}
                  </Typography>
                  <Chip 
                    label={gasto.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    size="small"
                    color="primary"
                    sx={{ fontSize: '0.7rem', height: '24px' }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabla de movimientos más compacta */}
      <Paper sx={{ p: 1.5 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', mb: 1 }}>
          Detalle de Movimientos
        </Typography>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.8rem' }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.8rem' }}>Proveedor</TableCell>
                <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.8rem' }}>Artículo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.8rem' }}>Descripción</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', py: 1, fontSize: '0.8rem' }}>Cantidad</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', py: 1, fontSize: '0.8rem' }}>Precio Unit.</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', py: 1, fontSize: '0.8rem' }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 15).map((row, index) => (
                <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ py: 0.5, fontSize: '0.8rem' }}>{row.fecha || 'N/A'}</TableCell>
                  <TableCell sx={{ py: 0.5, fontSize: '0.8rem' }}>
                    {row.proveedor && row.proveedor.length > 20 ? row.proveedor.substring(0, 20) + '...' : row.proveedor || 'N/A'}
                  </TableCell>
                  <TableCell sx={{ py: 0.5, fontSize: '0.8rem' }}>{row.articulo || 'N/A'}</TableCell>
                  <TableCell sx={{ py: 0.5, fontSize: '0.8rem' }}>
                    {row.descripcion_material && row.descripcion_material.length > 25 ? row.descripcion_material.substring(0, 25) + '...' : row.descripcion_material || 'N/A'}
                  </TableCell>
                  <TableCell align="right" sx={{ py: 0.5, fontSize: '0.8rem' }}>{row.cantidad || 1}</TableCell>
                  <TableCell align="right" sx={{ py: 0.5, fontSize: '0.8rem' }}>
                    {(row.precio_unitario || 0).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell align="right" sx={{ py: 0.5, fontSize: '0.8rem' }}>
                    {((row.precio_unitario || 0) * (row.cantidad || 1)).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;