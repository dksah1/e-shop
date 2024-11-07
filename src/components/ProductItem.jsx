import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductItem = ({ product }) => {
  return (
    <div className="relative flex flex-col items-center justify-start w-full h-72 sm:h-80 md:h-96 lg:h-[24rem] bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-lg hover:shadow-blue-100 transition-shadow duration-300 pb-4 sm:pb-0">
      <Link to={`/product/${product?.slug}`} className="h-full w-full block">
        <div className="flex flex-col h-full w-full">
          <div className="h-4/5 w-full overflow-hidden relative">
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            {product?.offPercent > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                -{product?.offPercent}%
              </div>
            )}
          </div>

          <div className="h-2/5 w-full bg-white p-3 space-y-1">
            <h2 className="text-sm font-semibold text-gray-800 text-left line-clamp-2 h-9">
              {product?.title}
            </h2>
            <p className="text-xs text-gray-500 text-left">
              Brand: {product?.brand?.name}
            </p>

            <div className="flex items-center space-x-1 text-left">
              <span className="text-sm font-bold text-orange-500">
                Rs.{product?.price}
              </span>
              {product.offPercent > 0 && (
                <span className="text-xs text-gray-500 line-through">
                  Rs.{product?.strikePrice}
                </span>
              )}
            </div>

            <div className="flex items-center text-yellow-400 text-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.round(product?.ratings)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-gray-500">
                ({product?.totalRatings})
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
