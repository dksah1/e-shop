import React from "react";
import ProductList from "../components/ProductList";
import { motion } from "framer-motion";

const ProductPage = () => {
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <ProductList />
    </motion.div>
  );
};

export default ProductPage;
