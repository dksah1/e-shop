import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(true); // Show header on scroll down
      } else {
        setShowHeader(false); // Hide header on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
    >
      <header className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">E-Shop</h1>
        <nav className="space-x-4">
          <a href="#home" className="text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="#products" className="text-gray-700 hover:text-gray-900">
            Products
          </a>
          <a href="#about" className="text-gray-700 hover:text-gray-900">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </a>
        </nav>
      </header>
    </motion.div>
  );
};

export default Header;
