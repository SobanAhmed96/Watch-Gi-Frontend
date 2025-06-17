import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    links: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/v1/getByIdProduct/${id}`);
        const { title, price, description, links, category, productImage } = res.data.productData;
        setForm({ title, price, description, links: links || "", category: category || "" });
        setPreview(productImage);
      } catch (error) {
        setMessage("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("links", form.links);
    formData.append("category", form.category);
    if (image) formData.append("productImage", image);

    try {
      await axios.put(`/api/v1/updateProduct/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setMessage("Product updated successfully.");
      navigate("/adminDashboard/getProduct");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>
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
          placeholder='External links (e.g. "https://...")'
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

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-contain mb-3 border rounded"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </div>
  );
};

export default EditProduct;
