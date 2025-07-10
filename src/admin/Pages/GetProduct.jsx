import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/v1/getProduct");
      setProducts(res.data.products);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleView = (id) => {
    navigate(`/adminDashboard/getProductById/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/adminDashboard/updateProduct/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/v1/deleteProduct/${id}`, { withCredentials: true });
      setProducts(products.filter((product) => product._id !== id));
      setSnack({ open: true, message: "Product deleted successfully", severity: "success" });
    } catch (err) {
      setSnack({
        open: true,
        message: "Failed to delete product",
        severity: "error",
      });
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
        products.map((product) => {
          const images = [
            product.productImage,
            product.productImage2,
            product.productImage3,
            product.productImage4,
          ].filter(Boolean); // remove undefined or empty

          return (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Carousel showThumbs={false} infiniteLoop autoPlay>
                {images.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </Carousel>

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-700">₹{product.price}</p>
                <div className="flex flex-col gap-2">
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
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Typography
          variant="h6"
          className="text-center col-span-full text-gray-500"
        >
          No products found.
        </Typography>
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
