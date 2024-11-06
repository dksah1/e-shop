import React from "react";
import ProductList from "../components/ProductList";
import { motion } from "framer-motion";

const ProductPage = () => {
  return (
    <motion.div>
      <ProductList />
    </motion.div>
  );
};

export default ProductPage;
