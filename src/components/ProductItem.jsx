import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductItem = ({ product }) => {
  return (
    <motion.div
      className="p-3 border rounded-lg bg-white shadow-lg max-w-sm mx-auto"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link to={`/product/${product.slug}`}>
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-36 object-cover rounded-t-lg"
          />
          {product.offPercent > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              -{product.offPercent}%
            </div>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <h2 className="text-sm font-semibold line-clamp-2">
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
            <span className="ml-2 text-gray-500">({product.totalRatings})</span>
          </div>
        </div>
      </Link>

      {/* <button
        className="mt-3 w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
        onClick={() => console.log("Add to cart")}
      >
        Add To Cart
      </button> */}
    </motion.div>
  );
};

export default ProductItem;
