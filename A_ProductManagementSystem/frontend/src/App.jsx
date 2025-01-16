
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProductList from "./pages/ProductList";
import Cart from "./pages/cart";
import "./App.css";
function App() {
  return (
    <>
      <Header />
      <main id="root">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/ProductList" element={<ProductList />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;
