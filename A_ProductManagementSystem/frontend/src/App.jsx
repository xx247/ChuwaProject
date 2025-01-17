
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Password from "./pages/Password";
import ProductList from "./pages/ProductList";
import EmailSent from "./pages/EmailSent";
import Cart from "./pages/cart";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";
import ProtectedRoute from './components/ProtectedRoute';
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
          <Route path="/password" element={<Password />} />
          <Route path="/emailsent" element={<EmailSent />} />
          <Route path="/ProductList" element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
            } />
          <Route path="/create/product" element={<CreateProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;
