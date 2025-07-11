import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/v1/getProduct");
        let fetchedProducts = res.data.products;

        if (category && category !== "All") {
          fetchedProducts = fetchedProducts.filter(
            (product) =>
              product.category?.toLowerCase() === category.toLowerCase()
          );
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleDetails = (id) => {
    navigate(`/Product/detail/${id}`);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mt-10 px-4 max-w-7xl mx-auto mb-5">
      <h2 className="text-3xl font-bold text-center mb-10">
        {category && category !== "All" ? `${category} Watches` : "All Watches"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product, idx) => {
            const images = [
              product.productImage,
              product.productImage2,
              product.productImage3,
              product.productImage4,
            ].filter(Boolean);

            return (
              <motion.div
                key={product._id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onClick={() => handleDetails(product._id)}
              >
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={false}
                  infiniteLoop
                  autoPlay
                  interval={3000}
                  className="rounded-t-2xl pointer-events-none"
                >
                  {images.map((imgUrl, imgIdx) => (
                    <motion.div
                      key={imgIdx}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.title} ${imgIdx + 1}`}
                        className="h-48 object-cover w-full"
                      />
                    </motion.div>
                  ))}
                </Carousel>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                  <p className="text-gray-600 mb-2">Rs: {product.price}</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <a
                      href={`https://wa.me/923172358782?text=Hi, I'm interested in the ${encodeURIComponent(
                        product.title
                      )} watch. ${product.productImage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-gray-800 transition w-full sm:w-auto text-center text-sm sm:text-base"
                    >
                      Buy Now
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDetails(product._id);
                      }}
                      className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-blue-700 transition w-full sm:w-auto text-sm sm:text-base"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center col-span-full text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
