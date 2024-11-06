import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
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
      className={`fixed w-full top-0 left-0 z-50 h-16 flex items-center transition-colors duration-300 ${
        scrolling ? "bg-white shadow-md" : "bg-transparent"
      }  ${scrolling ? "rounded-b-lg" : ""}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 ">
        <Link to="/">
          <div className="text-xl font-bold text-gray-800">E-Shop</div>
        </Link>
        <nav className="flex space-x-6">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <motion.a
              key={item}
              href="/"
              className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors"
              whileHover={{
                scale: 1.1,
                color: "#2563EB", // Tailwind's blue-600 hex color
              }}
            >
              {item}
              {/* Underline effect */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </motion.a>
          ))}
        </nav>
        <Link to="/cart">
          <button className="ml-4 flex items-center justify-center bg-blue-600 text-white rounded-full p-4 shadow-md hover:bg-blue-700 transition">
            <FaShoppingCart className="h-6 w-6" />
          </button>
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;
