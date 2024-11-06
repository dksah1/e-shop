import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ searchTerm, setSearchTerm, cartQuantity }) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-0 left-0 z-50 sm:h-16 h-24 flex items-center transition-all duration-300 ${
        scrolling
          ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
          : "bg-gradient-to-r from-blue-500 to-purple-600 bg-opacity-70"
      } ${scrolling ? "rounded-b-lg" : ""}`}
    >
      <div className="container mx-auto flex sm:flex-row flex-col items-center justify-between px-4">
        <div className="text-2xl  font-bold text-white capitalize">
          <Link to="/">swiftshopify</Link>
        </div>
        <nav className="space-x-6 hidden md:flex">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <motion.a
              key={item}
              href="/"
              className="relative text-white font-medium hover:text-yellow-400 transition-colors"
              whileHover={{
                scale: 1.1,
                color: "#FBBF24",
              }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </motion.a>
          ))}
        </nav>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-44 sm:w-64 md:w-96 ml-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-300 transition h-10 mr-4"
          />
          <Link to="/cart" className="relative">
            <button className="flex items-center justify-centern bg-yellow-400 text-white rounded-full p-4 shadow-md hover:bg-yellow-500 transition ">
              <FaShoppingCart className="h-6 w-6 " />
              {cartQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
