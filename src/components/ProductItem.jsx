import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductItem = ({ product }) => {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-start w-full sm:w-48 h-72 bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 mt-6 mx-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={`/product/${product.slug}`} className="h-full w-full block">
        <div className="flex flex-col h-full w-full">
          {/* Product Image */}
          <div className="h-3/5 w-full overflow-hidden relative">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            {product.offPercent > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                -{product.offPercent}%
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="h-2/5 w-full bg-white p-2  space-y-1">
            <h2 className="text-xs font-semibold text-gray-800 text-left line-clamp-2">
              {product.title}
            </h2>
            <p className="text-xs text-gray-500 text-left">
              Brand: {product.brand.name}
            </p>

            <div className="flex items-center space-x-1 text-left">
              <span className="text-sm font-bold text-orange-500">
                Rs.{product.price}
              </span>
              {product.offPercent > 0 && (
                <span className="text-xs text-gray-500 line-through">
                  Rs.{product.strikePrice}
                </span>
              )}
            </div>

            <div className="flex items-center text-yellow-400 text-xs ">
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
              <span className="ml-1 text-gray-500">
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
