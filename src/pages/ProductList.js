import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <img
              src={item.url}
              alt={item.name}
              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
            <h4 style={{ margin: "0.5rem 0" }}>{item.name}</h4>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
