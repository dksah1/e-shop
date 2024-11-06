import React, { useState } from "react";
import ProductList from "../components/ProductList";
import { motion } from "framer-motion";
import Header from "../components/Header";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{" "}
      <ProductList searchTerm={searchTerm} />
    </motion.div>
  );
};

export default ProductPage;
