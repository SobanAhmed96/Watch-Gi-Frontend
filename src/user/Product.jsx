import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/v1/getProduct");
        const fetchedProducts = res.data.products;
        setProducts(fetchedProducts);
        setAllProducts(fetchedProducts);

        // Extract unique categories
        const uniqueCategories = [
          'All',
          ...new Set(fetchedProducts.map((product) => product.category || 'Uncategorized'))
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Search + category filter logic
  const filterProducts = (searchValue, categoryValue) => {
    let filtered = allProducts;

    if (categoryValue !== 'All') {
      filtered = filtered.filter((product) => product.category === categoryValue);
    }

    if (searchValue) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setProducts(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProducts(value, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    filterProducts(searchTerm, value);
  };

  const handleDetails = (id) => {
    navigate(`/Product/detail/${id}`);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Our Watches</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title..."
          className="w-full max-w-md border p-2 rounded shadow"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-2 rounded shadow"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={product.productImage}
                alt={product.title}
                className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
                <p className="text-gray-600 mb-1">₹{product.price}</p>
                {product.category && (
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                )}
                <div className="flex justify-center gap-2">
                   <a
                    href={`https://wa.me/923172358782?text=Hi, I'm interested in the ${encodeURIComponent(
                      product.title
                    )} watch.%0AHere is the image: ${encodeURIComponent(
                      product.productImage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                  >
                    Buy Now
                  </a>
                  <button
                    onClick={() => handleDetails(product._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">No products found.</div>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Product;
