import React, { useState } from "react";
import axios from "axios";
import {
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnack({ open: false, message: "", severity: "info" });

    try {
      // Step 1: POST login request
      const loginRes = await axios.post(
        "/api/v1/loginAdmin",
        form,
        {
          withCredentials: true, // allow sending/receiving cookies
        }
      );

      console.log("Login Response:", loginRes.data);

      // Show success
      setSnack({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      // Step 2: Check authentication status
      const authRes = await axios.get(
        "/api/v1/isLogin",
        {
          withCredentials: true,
        }
      );

      console.log("Auth Check:", authRes.data);

      if (authRes.data.success === true) {
        navigate("/adminDashboard");
      } else {
        console.log("Not authenticated");
      }
    } catch (err) {
      console.error("Login error:", err);
      setSnack({
        open: true,
        message: err.response?.data?.message || "Login failed.",
        severity: "error",
      });
    }
  };

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper elevation={3} className="p-6 w-full max-w-sm">
        <Typography variant="h5" className="text-center mb-4">
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>

      {/* Snackbar Alert */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity={snack.severity} onClose={handleClose} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
