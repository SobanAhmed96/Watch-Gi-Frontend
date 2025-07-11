import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Men = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMensWatches = async () => {
      try {
        const res = await axios.get("/api/v1/getProduct");
        const allProducts = res.data.products;
        const mensWatches = allProducts.filter(
          (product) => product.category?.toLowerCase() === "men"
        );
        setProducts(mensWatches);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchMensWatches();
  }, []);

  const handleDetails = (id) => {
    navigate(`/Product/detail/${id}`);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Men's Watches</h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => {
              const images = [
                product.productImage,
                product.productImage2,
                product.productImage3,
                product.productImage4,
              ].filter(Boolean);

              return (
                <div
                  key={product._id}
                  onClick={() => handleDetails(product._id)}
                  className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
                >
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    infiniteLoop
                    autoPlay
                    interval={3000}
                    className="h-48"
                  >
                    {images.map((imgUrl, idx) => (
                      <div key={idx}>
                        <img
                          src={imgUrl}
                          alt={`${product.title} ${idx + 1}`}
                          className="h-48 object-cover w-full"
                        />
                      </div>
                    ))}
                  </Carousel>

                  <div className="p-4 text-center flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
                    <p className="text-gray-600 mb-1">Rs: {product.price}</p>
                    {product.category && (
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    )}
                    <div className="flex flex-col sm:flex-row justify-center gap-2 mt-auto">
                      <a
                        onClick={(e) => e.stopPropagation()}
                        href={`https://wa.me/923172358782?text=Hi, I'm interested in the ${encodeURIComponent(
                          product.title
                        )} watch.%0AHere is the image: ${encodeURIComponent(product.productImage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full hover:bg-gray-800 transition"
                      >
                        Buy Now
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDetails(product._id);
                        }}
                        className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full hover:bg-blue-700 transition"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center col-span-full text-gray-500">No men's watches found.</div>
          )}
        </div>
      </div>
      <Whatsapp />
      <Footer />
    </div>
  );
};

export default Men;
