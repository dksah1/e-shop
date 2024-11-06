import React, { useEffect, useState } from "react";
import ProductPage from "./pages/ProductPage";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartDetail from "./pages/CartDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useGetCartDetails } from "./hooks/useCartHooks";

const App = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const cartId = localStorage.getItem("cart_id");
  const { data: cartData } = useGetCartDetails(cartId);

  useEffect(() => {
    if (cartData) {
      const totalQuantity = cartData.data.data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartQuantity(totalQuantity);
    }
  }, [cartData]);
  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartQuantity={cartQuantity}
      />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
