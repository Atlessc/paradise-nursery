
import React from 'react';
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductListing from "./pages/ProductListing/ProductListing";
import NavBar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer";

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/shopping-cart" element={<h1>Shopping Cart</h1>} />
      </Routes>
    </div>
  );
}

export default App;
