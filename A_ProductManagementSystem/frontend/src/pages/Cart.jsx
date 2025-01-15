import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeToCart,
  removeSingleIteams,
  emptycartIteam,
} from "../redux/slices/cartSlice";

const Cart = ({ isOpen }) => {
  const { carts } = useSelector((state) => state.allCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const dispatch = useDispatch();

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  // Remove entire item from cart
  const handleRemoveItem = (id) => {
    dispatch(removeToCart(id));
  };

  // Decrement a single unit of an item
  const handleSingleDecrement = (item) => {
    dispatch(removeSingleIteams(item));
  };

  // Empty the entire cart
  const emptyCart = () => {
    dispatch(emptycartIteam());
  };

  // Calculate total price & quantity whenever carts changes
  useEffect(() => {
    let price = 0;
    let quantity = 0;
    carts.forEach((item) => {
      price += item.price * item.qnty;
      quantity += item.qnty;
    });
    setTotalPrice(price);
    setTotalQuantity(quantity);
  }, [carts]);

  //
  //
  const sidebarStyle = {
    position: "fixed",
    top: "76px",
    right: isOpen ? "0" : "-340px",
    width: "300px",
    // height: "calc(100vh - 176px)",
    height: "500px",
    backgroundColor: "#fff",
    color: "#000",
    borderLeft: "1px solid #ccc",
    padding: "20px",
    overflowY: "auto",
    transition: "right 0.3s ease-in-out",
    zIndex: 9999,
  };

  const buttonStyle = {
    padding: "0.25rem 0.5rem",
    margin: "0 0.25rem",
    cursor: "pointer",
    border: "1px solid #444",
    backgroundColor: "#eee",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thTdStyle = {
    border: "1px solid #ccc",
    padding: "6px",
    textAlign: "center",
  };

  return (
    <aside style={sidebarStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Cart {carts.length > 0 && `(${carts.length})`}</h2>
        {carts.length > 0 && (
          <button style={buttonStyle} onClick={emptyCart}>
            Empty Cart
          </button>
        )}
      </div>

      {carts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Remove</th>
              <th style={thTdStyle}>Product</th>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Price</th>
              <th style={thTdStyle}>Qty</th>
              <th style={thTdStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((item) => (
              <tr key={item.id}>
                <td style={thTdStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    X
                  </button>
                </td>
                <td style={thTdStyle}>
                  <img
                    src={item.url}
                    alt={item.name}
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td style={thTdStyle}>{item.name}</td>
                <td style={thTdStyle}>{item.price}</td>
                <td style={thTdStyle}>
                  <button
                    style={buttonStyle}
                    onClick={
                      item.qnty <= 1
                        ? () => handleRemoveItem(item.id)
                        : () => handleSingleDecrement(item)
                    }
                  >
                    -
                  </button>
                  <span style={{ margin: "0 6px" }}>{item.qnty}</span>
                  <button
                    style={buttonStyle}
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </td>
                <td style={thTdStyle}>{item.price * item.qnty}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" />
              <td style={thTdStyle}>Items: {totalQuantity}</td>
              <td style={thTdStyle} colSpan="2">
                Total: {totalPrice}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </aside>
  );
};

export default Cart;
