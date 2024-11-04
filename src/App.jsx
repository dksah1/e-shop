import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductPage from "./pages/ProductPage";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartDetail from "./pages/CartDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/cart" element={<CartDetail />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
    </Routes>
    <ToastContainer />
  </QueryClientProvider>
);

export default App;
