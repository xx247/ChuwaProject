import React, { useEffect } from "react";
import { addToCart } from "../redux/slices/cartSlice";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadProducts } from "../redux/slices/productSlice";
import { useParams } from "react-router-dom";
import "./ProductList.css";
// import Cart from "./cart";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [cartOpen, setCartOpen] = useState(false);
  const products = useSelector((state) => state.product.products);
  const totalCount = useSelector((state) => state.product.totalCount);
  const params = useParams();

  useEffect(() => {
    const curPage = params.curPage ? parseInt(params.curPage, 10) : 0;
    dispatch(loadProducts({perPage: 10, curPage: curPage}));
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
      color: "#fff", cursor: "pointer", margin: "12px 0", padding: "5px 20px", lineHeight: "1.5em", maxHeight: "2em", maxWidth: "150px"}}>
        Add Product
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
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
      <div className="pagination">
        <a href="/productList/0">&laquo;</a>
        {[...Array(Math.ceil(totalCount / 10))].map((e, i) => <a href={`/productList/${i}`} key={i}>{i + 1}</a>)}
        <a href={`/productList/${Math.ceil(totalCount / 10) - 1}`}>&raquo;</a>
      </div>
    </div>
  );
};

export default ProductList;
