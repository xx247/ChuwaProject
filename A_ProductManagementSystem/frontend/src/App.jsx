// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
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
          <Route path="/ProductList" element={<ProductList />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;
