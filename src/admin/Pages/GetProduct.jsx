import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });
  const [deletingId, setDeletingId] = useState("");

  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("/api/v1/getProduct");
      setProducts(res.data.products);
      setError("");
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleView = (id) => {
    navigate(`/adminDashboard/getProductById/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/adminDashboard/updateProduct/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    setDeletingId(id);
    try {
      await axios.delete(`/api/v1/deleteProduct/${id}`, { withCredentials: true });
      setProducts(products.filter((product) => product._id !== id));
      setSnack({ open: true, message: "Product deleted successfully", severity: "success" });
    } catch (err) {
      setSnack({ open: true, message: "Failed to delete product", severity: "error" });
    } finally {
      setDeletingId("");
    }
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={
                product.productImage?.startsWith("http")
                  ? product.productImage
                  : `https://your-domain.com${product.productImage}`
              }
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-700">₹{product.price}</p>
              <div className="flex justify-between gap-2">
                <Button
                  variant="outlined"
                  color="info"
                  fullWidth
                  onClick={() => handleView(product._id)}
                >
                  View
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={() => handleDelete(product._id)}
                  disabled={deletingId === product._id}
                >
                  {deletingId === product._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center">
          <Typography variant="h6" className="text-gray-500">
            No products found.
          </Typography>
        </div>
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GetProduct;
