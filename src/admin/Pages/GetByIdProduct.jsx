import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GetByIdProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await axios.get(`/api/v1/getByIdProduct/${id}`);
        if (res.data?.success) {
          setProduct(res.data.product); // ✅ use 'product' as returned by backend
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

  const handleEdit = () => {
    navigate(`/adminDashboard/updateProduct/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/v1/deleteProduct/${id}`);
      alert("Product deleted successfully.");
      navigate("/adminDashboard/getProduct");
    } catch (err) {
      alert("Failed to delete product.");
    }
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
      <div className="text-center mt-10 text-red-500">{error}</div>
    );
  }

  // Collect all product images into an array for the carousel
  const images = [
    product?.productImage,
    product?.productImage2,
    product?.productImage3,
    product?.productImage4,
  ].filter(Boolean); // Remove undefined or empty images

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
      {images.length > 0 && (
        <Carousel
          showArrows
          showThumbs
          infiniteLoop
          dynamicHeight
          autoPlay
        >
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Product ${index + 1}`}
                className="object-cover h-64 w-full rounded"
              />
            </div>
          ))}
        </Carousel>
      )}

      <h2 className="text-2xl font-bold mt-4 mb-2">{product?.title}</h2>
      <p className="text-lg text-gray-700 mb-1">Price: ₹{product?.price}</p>
      <p className="text-gray-600 mb-1">Category: <span className="font-medium">{product?.category}</span></p>
      <p className="text-gray-600 mb-4">{product?.description}</p>

      {product?.links && (
        <div className="mb-4">
          <a
            href={product.links}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Visit Product Link
          </a>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GetByIdProduct;
