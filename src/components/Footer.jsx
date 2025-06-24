import React from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Container,
  Button,
} from '@mui/material';
import { Facebook, WhatsApp } from '@mui/icons-material';
import { FaTiktok } from 'react-icons/fa'; // TikTok icon from react-icons
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" gutterBottom>
              Watch GI
            </Typography>
            <Typography variant="body2" color="gray">
              Discover timeless elegance in our curated collection of watches for Men, Women, and Children.
            </Typography>
          </Grid>

          {/* Quick Links as Buttons */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                onClick={() => navigate('/')}
                sx={{ color: '#fff', justifyContent: 'flex-start' }}
              >
                Home
              </Button>
              <Button
                onClick={() => navigate('/Product')}
                sx={{ color: '#fff', justifyContent: 'flex-start' }}
              >
                Shop
              </Button>
              <Button
                onClick={() => navigate('/Contact')}
                sx={{ color: '#fff', justifyContent: 'flex-start' }}
              >
                Contact
              </Button>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                href="https://www.facebook.com/profile.php?id=61577188271987&sk=about"
                target="_blank"
                sx={{ color: '#fff' }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://www.tiktok.com/@watch.gi"
                target="_blank"
                sx={{ color: '#fff' }}
              >
                <FaTiktok size={24} />
              </IconButton>
              <IconButton
                href="https://wa.me/923172358782"
                target="_blank"
                sx={{ color: '#fff' }}
              >
                <WhatsApp />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ textAlign: 'center', mt: 5, borderTop: '1px solid #444', pt: 3 }}>
          <Typography variant="caption" color="gray">
            © {new Date().getFullYear()} Watch GI Watches. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
