import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/v1/getByIdProduct/${id}`);
        setProduct(res.data.productData);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product) return null;

  // Collect product images into an array
  const images = [
    product.productImage,
    product.productImage2,
    product.productImage3,
    product.productImage4,
  ].filter(Boolean);

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
          {/* Carousel for Images */}
          <div>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={3000}
              className="rounded-xl shadow-md"
            >
              {images.map((imgUrl, idx) => (
                <div key={idx}>
                  <img
                    src={imgUrl}
                    alt={`${product.title} ${idx + 1}`}
                    className="h-96 object-cover rounded-xl"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
              <p className="text-xl text-gray-700 mb-1">Rs: {product.price}</p>
              {product.category && (
                <p className="text-sm text-gray-500 mb-3">
                  Category: {product.category}
                </p>
              )}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Product Link Display */}
              <div className="mb-4">
                {product.links ? (
                  <a
                    href={product.links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {product.links}
                  </a>
                ) : (
                  <span className="text-gray-500">No Links</span>
                )}
              </div>
            </div>

            {/* Buy Now Button */}
            <a
              href={`https://wa.me/923172358782?text=Hi, I'm interested in the ${encodeURIComponent(
                product.title || "watch"
              )} watch.%0AHere is the image: ${encodeURIComponent(
                product.productImage || "Image not available"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-4 text-center py-2 rounded-full hover:bg-gray-800 transition"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
      <Whatsapp />
      <Footer />
    </div>
  );
};

export default Details;
