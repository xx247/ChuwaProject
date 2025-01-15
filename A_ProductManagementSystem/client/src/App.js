import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ flex: 1, padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/create/product" element={<CreateProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          {/* Add more routes as you build out pages */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
