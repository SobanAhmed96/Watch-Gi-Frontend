import React, { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    links: "",
    category: "",
  });

  const [images, setImages] = useState([null, null, null, null]);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = [...images];
    newImages[index] = files[0];
    setImages(newImages);
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("links", form.links);
    formData.append("category", form.category);

    images.forEach((img) => {
      if (img) formData.append("productImages", img);
    });

    try {
      await axios.post("/api/v1/addProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setForm({
        title: "",
        price: "",
        description: "",
        links: "",
        category: "",
      });
      setImages([null, null, null, null]);
      setSnack({
        open: true,
        message: "Product added successfully",
        severity: "success",
      });
    } catch (error) {
      setSnack({
        open: true,
        message: error.response?.data?.message || "Something went wrong. Try again.",
        severity: "error",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="links"
          placeholder="External Link"
          value={form.links}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        >
          <option value="">Select Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Children">Children</option>
        </select>

        {images.map((_, idx) => (
          <input
            key={idx}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, idx)}
            className="w-full border p-2 mb-3 rounded"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snack.severity}
          onClose={handleCloseSnack}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProduct;
