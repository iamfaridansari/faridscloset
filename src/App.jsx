import React from "react";
//
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
//
import "./css/style.css";
import "./css/responsive.css";
//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
//
import { CartContextProvider } from "./context/CartContext";
import { WishlistContextProvider } from "./context/WishlistContext";
import { ProductContextProvider } from "./context/ProductContext";

const App = () => {
  return (
    <CartContextProvider>
      <WishlistContextProvider>
        <ProductContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
          </Router>
        </ProductContextProvider>
      </WishlistContextProvider>
    </CartContextProvider>
  );
};

export default App;
