import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Check from "./Check";

const CreateAdmin = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    number: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnack({ open: false, message: "", severity: "info" });

    try {
      const res = await axios.post("/api/v1/addAdmin", form, {
        withCredentials: true,
      });

      setSnack({ open: true, message: res.data.message, severity: "success" });
      setForm({ fullname: "", email: "", password: "", number: "" });
    } catch (err) {
      setSnack({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    }
  };

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
        <Check />
      <Typography variant="h5" mb={2}>
        Create Admin
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="number"
          value={form.number}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Create Admin
        </Button>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreateAdmin;
