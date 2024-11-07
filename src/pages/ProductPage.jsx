import React from "react";
import ProductList from "../components/ProductList";
import { motion } from "framer-motion";

const ProductPage = ({ searchTerm }) => {
  return (
    <motion.div>
      <ProductList searchTerm={searchTerm} />
    </motion.div>
  );
};

export default ProductPage;
