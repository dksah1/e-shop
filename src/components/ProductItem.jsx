import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductItem = ({ product }) => {
  // State to control visibility of details on mobile
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      className="group relative w-full sm:w-64 h-80 bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setShowDetails(!showDetails)}
    >
      <Link to={`/product/${product.slug}`} className="h-full w-full block">
        <div className="h-full w-full overflow-hidden relative">
          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          {product.offPercent > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              -{product.offPercent}%
            </div>
          )}

          {/* Product Details - Initially hidden, shows on hover */}
          <div
            className={`absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-4 space-y-2 transform ${
              showDetails || "translate-y-full" // For mobile, toggle visibility
            } group-hover:translate-y-0 transition-transform duration-300 ease-in-out`}
          >
            <h2 className="text-sm font-semibold line-clamp-2 text-gray-800">
              {product.title}
            </h2>
            <p className="text-xs text-gray-500">Brand: {product.brand.name}</p>

            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-gray-900">
                ${product.price}
              </span>
              {product.offPercent > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.strikePrice}
                </span>
              )}
            </div>

            <div className="flex items-center text-yellow-400 text-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.round(product.ratings)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-500">
                ({product.totalRatings})
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;
