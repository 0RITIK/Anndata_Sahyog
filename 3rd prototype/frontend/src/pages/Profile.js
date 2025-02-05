import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  useTheme,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const theme = useTheme();
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    phone: user?.phone || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    setLoading(true);

    const result = await updateProfile(formData);
    if (result.success) {
      setSuccess('Profile updated successfully');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Profile Summary Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: '0 auto 16px',
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2.5rem',
                }}
              >
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              <Chip
                label={user?.user_type === 'seller' ? 'Seller' : 'Buyer'}
                color="primary"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activity Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Transactions
                  </Typography>
                  <Typography variant="h6">24</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Active Listings
                  </Typography>
                  <Typography variant="h6">12</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Reviews
                  </Typography>
                  <Typography variant="h6">4.8/5</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography variant="h6">2024</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Profile Card */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Edit Profile
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{ mt: 2 }}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          {/* Recent Activity Card */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  No recent activity to display
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
