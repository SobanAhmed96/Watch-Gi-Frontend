import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import {
  Box, Container, Grid, TextField, Typography,
  Button, Paper, Snackbar, Alert
} from '@mui/material';
import Footer from '../components/Footer';

const Contact = () => {
  const formRef = useRef();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

   
    emailjs.sendForm(
      'service_rkjkxkq',     // 🔁 Replace with your service ID
      'template_kwwyw1r',    // 🔁 Replace with your template ID
      formRef.current,
      'Af4bBjml7BCNxrsLT'         // 🔁 Replace with your user ID (or public key)
    )
    .then(() => {
      setOpen(true);
      formRef.current.reset();
    })
    .catch((error) => {
      alert('Failed to send message: ' + error.text);
    });
  };

  return (
    <div>
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>Contact Us</Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            We'd love to hear from you. Please fill out the form below.
          </Typography>

          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField name="user_name" fullWidth label="Name" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="user_email" type="email" fullWidth label="Email" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="subject" fullWidth label="Subject" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="message" fullWidth label="Message" multiline rows={4} required />
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <Button type="submit" variant="contained" color="primary">
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

         <Box mt={6} textAlign="center">
  <Typography>📞 Phone: +92 03172358782</Typography>
  <Typography>
    🟢 WhatsApp: <a href="https://wa.me/923172358782" target="_blank" rel="noopener noreferrer">
      Chat on WhatsApp
    </a>
  </Typography>
</Box>

        </Container>
      </Box>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success">
          Message sent successfully!
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
};

export default Contact;
