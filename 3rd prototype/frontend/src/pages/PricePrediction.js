import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Line,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PricePrediction() {
  const theme = useTheme();
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Livestock',
    'Others',
  ];

  useEffect(() => {
    if (category && location) {
      fetchHistoricalData();
    }
  }, [category, location]);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/predictions/predict', {
        params: { category, location },
      });
      setPredictions(response.data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
    setLoading(false);
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get('/api/predictions/historical', {
        params: {
          category,
          location,
          start_date: '2024-01-01', // Last 30 days
        },
      });
      setHistoricalData(response.data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  const chartData = {
    labels: [...historicalData.map(d => new Date(d.date).toLocaleDateString()),
            ...predictions.map(d => new Date(d.prediction_date).toLocaleDateString())],
    datasets: [
      {
        label: 'Historical Prices',
        data: historicalData.map(d => d.price),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main + '20',
        fill: true,
      },
      {
        label: 'Predicted Prices',
        data: [...Array(historicalData.length).fill(null),
              ...predictions.map(d => d.predicted_price)],
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main + '20',
        borderDash: [5, 5],
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Trends and Predictions',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price (₹)',
        },
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 600 }}>
        Market Price Prediction
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Product Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={fetchPredictions}
                disabled={!category || !location || loading}
              >
                {loading ? 'Predicting...' : 'Get Prediction'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Price Chart */}
      {(historicalData.length > 0 || predictions.length > 0) && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Line data={chartData} options={chartOptions} />
          </CardContent>
        </Card>
      )}

      {/* Predictions Table */}
      {predictions.length > 0 && (
        <Grid container spacing={3}>
          {predictions.map((prediction, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {new Date(prediction.prediction_date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    ₹{prediction.predicted_price.toFixed(2)}
                  </Typography>
                  <Typography color="text.secondary">
                    Confidence Score: {(prediction.confidence_score * 100).toFixed(1)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default PricePrediction;
