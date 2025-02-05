import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  useTheme,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    userType: 'buyer',
    location: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      user_type: formData.userType,
      location: formData.location,
      phone: formData.phone,
    });

    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(120deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
        py: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '90%',
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              textAlign: 'center',
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">I am a:</FormLabel>
              <RadioGroup
                row
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="buyer"
                  control={<Radio />}
                  label="Buyer"
                />
                <FormControlLabel
                  value="seller"
                  control={<Radio />}
                  label="Seller"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              value={formData.location}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Phone Number"
              name="phone"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
            >
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
