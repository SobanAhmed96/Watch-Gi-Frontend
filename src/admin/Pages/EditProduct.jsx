import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    links: "",
    category: "",
  });

  const [currentImages, setCurrentImages] = useState({
    productImage: "",
    productImage2: "",
    productImage3: "",
    productImage4: "",
  });

  const [imageFiles, setImageFiles] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/v1/getByIdProduct/${id}`);
        const data = res.data.product;

        setFormData({
          title: data.title,
          price: data.price,
          description: data.description,
          links: data.links,
          category: data.category,
        });

        setCurrentImages({
          productImage: data.productImage || "",
          productImage2: data.productImage2 || "",
          productImage3: data.productImage3 || "",
          productImage4: data.productImage4 || "",
        });
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e, key) => {
    setImageFiles((prev) => ({
      ...prev,
      [key]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append("title", formData.title);
      updateData.append("price", formData.price);
      updateData.append("description", formData.description);
      updateData.append("links", formData.links);
      updateData.append("category", formData.category);

      // Append new image files if selected
      Object.values(imageFiles).forEach((file) => {
        updateData.append("productImages", file);
      });

      await axios.put(`/api/v1/updateProduct/${id}`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully");
      navigate("/adminDashboard/getProduct");
    } catch (error) {
      console.error("Failed to update product", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="links"
          value={formData.links}
          onChange={handleChange}
          placeholder="Links"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
        />

        {["productImage", "productImage2", "productImage3", "productImage4"].map((key, index) => (
          <div key={key}>
            <p className="mb-2">Current Image {index + 1}:</p>
            {currentImages[key] ? (
              <img
                src={currentImages[key]}
                alt={`Current ${key}`}
                className="w-40 mb-2 rounded"
              />
            ) : (
              <p className="mb-2 text-gray-500">No image uploaded</p>
            )}
            <input
              type="file"
              onChange={(e) => handleImageChange(e, key)}
              className="border p-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
