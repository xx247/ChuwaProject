import React, { useEffect, useState } from "react";
import { addToCart } from "../redux/slices/cartSlice";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadProducts } from "../redux/slices/productSlice";
// import Cart from "./cart";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [cartOpen, setCartOpen] = useState(false);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(loadProducts());
    //------future api-------
    // const fetchData = async () => {
    //   const data = await getProducts();
    //   setProducts(data);
    // };
    // fetchData();
  }, []);

  // const ProductList = () => {
  //   const [products, setProducts] = useState(Products);
  //   const dispatch = useDispatch();

  // add to cart
  const send = (e) => {
    dispatch(addToCart(e));
  };

  return (
    <div>
      <h1>Products</h1>
      {/* <button onClick={() => setCartOpen(true)}>View Cart</button> */}
      <button onClick={e => navigate('/create/product')} style={{ backgroundColor: "#405cf5", borderRadius: "6px", 
      color: "#fff", cursor: "pointer", margin: "12px 0", padding: "5px 20px", lineHeight: "1.5em", maxHeight: "2em"}}>
        Add Product
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
          marginBottom: "150px",
        }}
      >
        {products.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <img
              src={item.link}
              alt={item.name}
              style={{ width: "80px", height: "80px", objectFit: "cover", cursor: "pointer" }}
              onClick={e => navigate('/products/' + item._id)}
            />
            <h4 style={{ margin: "0.5rem 0" }}>{item.name}</h4>
            <p>${item.price}</p>
            <Button onClick={() => send(item)}>Add TO Cart</Button>
            {/* <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
