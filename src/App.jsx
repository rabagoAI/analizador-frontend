import React, { useState } from 'react';
import {
  Container,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import { Analytics, CloudUpload, Security, Speed } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#0a1929',
      paper: '#132f4c',
    },
  },
});

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const plans = [
    {
      name: "Gratis",
      price: "€0",
      period: "siempre",
      features: [
        "Hasta 100 registros por archivo",
        "Análisis básico de costos",
        "Gráficos simples",
        "Exportación limitada"
      ],
      color: "primary",
      popular: false
    },
    {
      name: "Profesional",
      price: "€19",
      period: "por mes",
      features: [
        "Hasta 10,000 registros por archivo",
        "Análisis avanzado",
        "Gráficos interactivos",
        "Exportación completa",
        "Soporte prioritario"
      ],
      color: "secondary",
      popular: true
    },
    {
      name: "Empresa",
      price: "€49",
      period: "por mes",
      features: [
        "Registros ilimitados",
        "Análisis predictivo",
        "Reportes automatizados",
        "API acceso",
        "Soporte 24/7",
        "Dashboard personalizado"
      ],
      color: "warning",
      popular: false
    }
  ];

  const features = [
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: "Análisis en Tiempo Real",
      description: "Visualiza tus datos de costos instantáneamente con gráficos interactivos"
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Seguro y Privado",
      description: "Tus datos se procesan localmente y nunca se almacenan en nuestros servidores"
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: "Procesamiento Rápido",
      description: "Analiza archivos grandes en segundos con nuestra tecnología optimizada"
    }
  ];

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
  };

  const handlePlanSelect = (plan) => {
    console.log('Plan seleccionado:', plan);
    // Aquí iría la lógica de procesamiento de pago
  };

  if (analysisData) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Dashboard data={analysisData} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)' 
      }}>
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Toolbar>
            <Analytics sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              CostAnalytics
            </Typography>
          </Toolbar>
        </AppBar>

        <Container 
  maxWidth="lg" 
  sx={{ 
    py: 6,
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}
>
  {/* Hero Section */}
  <Box textAlign="center" sx={{ mb: 8 }}>
    <Typography 
      variant="h2" 
      component="h1" 
      gutterBottom 
      sx={{ 
        fontWeight: 'bold', 
        color: 'white',
        fontSize: isMobile ? '2.5rem' : '3.5rem'
      }}
    >
      Analiza tus Archivos de Costos
    </Typography>
    <Typography 
      variant="h5" 
      sx={{ 
        color: alpha('#fff', 0.8),
        mb: 4,
        fontSize: isMobile ? '1.1rem' : '1.3rem'
      }}
    >
      Transforma tus datos CSV en insights accionables con nuestro dashboard interactivo
    </Typography>
  </Box>

          {/* Pricing Cards */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              align="center" 
              gutterBottom 
              sx={{ color: 'white', mb: 4 }}
            >
              Selecciona un plan
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              {plans.map((plan) => (
                <Grid item xs={12} md={4} key={plan.name}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      transition: 'all 0.3s ease',
                      border: plan.popular ? `2px solid ${theme.palette[plan.color].main}` : '2px solid transparent',
                      transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                      '&:hover': {
                        transform: plan.popular ? 'scale(1.08)' : 'scale(1.03)',
                        boxShadow: 8
                      },
                      background: 'rgba(19, 47, 76, 0.8)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      {plan.popular && (
                        <Box
                          sx={{
                            backgroundColor: theme.palette[plan.color].main,
                            color: 'white',
                            py: 0.5,
                            px: 2,
                            borderRadius: 2,
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            mb: 2
                          }}
                        >
                          MÁS POPULAR
                        </Box>
                      )}
                      
                      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {plan.name}
                      </Typography>
                      
                      <Box sx={{ my: 3 }}>
                        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: theme.palette[plan.color].main }}>
                          {plan.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {plan.period}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        {plan.features.map((feature, idx) => (
                          <Typography 
                            key={idx} 
                            variant="body2" 
                            sx={{ 
                              py: 0.5,
                              color: 'text.primary'
                            }}
                          >
                            ✓ {feature}
                          </Typography>
                        ))}
                      </Box>

                      <Button
                        variant={plan.popular ? "contained" : "outlined"}
                        color={plan.color}
                        fullWidth
                        size="large"
                        onClick={() => handlePlanSelect(plan)}
                        sx={{ 
                          mt: 2,
                          py: 1.5,
                          fontWeight: 'bold'
                        }}
                      >
                        {plan.name === "Gratis" ? "Comenzar Gratis" : "Seleccionar Plan"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* File Upload Section */}
          <Box sx={{ mb: 8 }}>
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                background: 'rgba(19, 47, 76, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <CloudUpload sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Comienza a Analizar tus Datos
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Arrastra tu archivo CSV aquí o haz clic para seleccionar uno
              </Typography>
              
              <FileUpload onDataProcessed={handleAnalysisComplete} />
            </Paper>
          </Box>

          {/* Features Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'white', mb: 4 }}>
              ¿Por qué elegir nuestra plataforma?
            </Typography>
            
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper 
                    sx={{ 
                      p: 4,
                      height: '100%',
                      background: 'rgba(19, 47, 76, 0.8)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;