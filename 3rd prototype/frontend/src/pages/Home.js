import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Store as StoreIcon,
  ShowChart as ShowChartIcon,
  People as PeopleIcon,
  Agriculture as AgricultureIcon,
} from '@mui/icons-material';

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <StoreIcon sx={{ fontSize: 40 }} />,
      title: 'Marketplace',
      description: 'Connect with buyers and sellers in our agricultural marketplace',
      path: '/marketplace',
    },
    {
      icon: <ShowChartIcon sx={{ fontSize: 40 }} />,
      title: 'Price Predictions',
      description: 'Get accurate market price predictions using advanced analytics',
      path: '/price-prediction',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Network',
      description: 'Build relationships with farmers, wholesalers, and retailers',
      path: '/marketplace',
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: `linear-gradient(120deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
          borderRadius: 4,
          mb: 6,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <AgricultureIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
        </Box>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            color: theme.palette.primary.main,
            fontWeight: 'bold',
          }}
        >
          AgriFarm Connect
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 4, color: theme.palette.text.secondary }}
        >
          Connecting Farmers and Buyers in a Smart Marketplace
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/marketplace')}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
          }}
        >
          Explore Marketplace
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    color: theme.palette.primary.main,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(feature.path)}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Statistics Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Our Impact
        </Typography>
        <Grid container spacing={4}>
          {[
            { value: '1000+', label: 'Active Farmers' },
            { value: '500+', label: 'Daily Trades' },
            { value: '95%', label: 'Satisfied Users' },
          ].map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h3"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
