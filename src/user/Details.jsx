import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/v1/getByIdProduct/${id}`);
        console.log(res.data);

        if (res.data?.product) {
          setProduct(res.data.product);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-lg font-medium">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!product) return null;

  const images = [
    product.productImage,
    product.productImage2,
    product.productImage3,
    product.productImage4,
  ].filter((img) => img);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-3xl shadow-2xl">
          {/* Carousel */}
          <div>
            {images.length > 0 ? (
              <Carousel
                showArrows
                showThumbs={false}
                infiniteLoop
                autoPlay
                className="rounded-2xl overflow-hidden"
              >
                {images.map((img, idx) => (
                  <div key={idx}>
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="h-96 w-full object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="h-96 bg-gray-100 flex items-center justify-center rounded-2xl">
                <p className="text-gray-400">No image available</p>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
              <p className="text-2xl text-green-600 font-semibold mb-2">Rs: {product.price}</p>
              {product.category && (
                <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
              )}
              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

              {/* Link */}
              <div className="mb-6">
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
                  <span className="text-gray-500">No link available</span>
                )}
              </div>
            </div>

            {/* Buy Now Button */}
            <a
              href={`https://wa.me/923172358782?text=${encodeURIComponent(
                `Hi, I'm interested in the ${product.title || "watch"} watch.\nPrice: Rs ${product.price}.\nHere is the image: ${product.productImage || "Image not available"}.\nLink: ${product.links || "No link provided"}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white py-3 rounded-full text-center text-lg font-medium hover:bg-gray-800 transition duration-300"
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
