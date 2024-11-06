import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import { motion } from "framer-motion";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div>
      <ProductList searchTerm={searchTerm} />
    </motion.div>
  );
};

export default ProductPage;
