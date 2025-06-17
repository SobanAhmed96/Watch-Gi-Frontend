import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Children = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildWatches = async () => {
      try {
        const res = await axios.get("/api/v1/getProduct");
        const allProducts = res.data.products;

        const childWatches = allProducts.filter(
          (product) => product.category?.toLowerCase() === "children"
        );

        setProducts(childWatches);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchChildWatches();
  }, []);

  const handleDetails = (id) => {
    navigate(`/Product/detail/${id}`);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Children's Watches</h1>

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
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
                <p className="text-gray-600 mb-2">₹{product.price}</p>
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
          <div className="text-center col-span-full text-gray-500">
            No children's watches found.
          </div>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Children;
