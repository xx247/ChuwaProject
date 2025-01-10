import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeToCart,
  removeSingleIteams,
  emptycartIteam,
} from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const { carts } = useSelector((state) => state.allCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const dispatch = useDispatch();

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  // Remove an entire item from cart (all quantity)
  const handleRemoveItem = (id) => {
    dispatch(removeToCart(id));
    toast.success("Item removed from your cart");
  };

  // Decrement a single unit of an item
  const handleSingleDecrement = (item) => {
    dispatch(removeSingleIteams(item));
  };

  // Empty the entire cart
  const emptyCart = () => {
    dispatch(emptycartIteam());
    toast.success("Your cart is now empty");
  };

  // Calculate total price
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => {
      total += item.price * item.qnty;
    });
    setTotalPrice(total);
  }, [carts]);

  // Calculate total item quantity
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => {
      total += item.qnty;
    });
    setTotalQuantity(total);
  }, [carts]);

  return (
    <aside>
      {/* Header area */}
      <div>
        <h2>
          My Cart
          {carts.length > 0 && ` (${carts.length})`}
        </h2>
        {carts.length > 0 && <button onClick={emptyCart}>Empty Cart</button>}
      </div>

      {/* Cart content */}
      {carts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Remove</th>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((item) => (
              <tr key={item.id}>
                <td>
                  <button onClick={() => handleRemoveItem(item.id)}>X</button>
                </td>
                <td>
                  <img
                    src={item.imgdata}
                    alt={item.dish}
                    width={60}
                    height={60}
                  />
                </td>
                <td>{item.dish}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={
                      item.qnty <= 1
                        ? () => handleRemoveItem(item.id)
                        : () => handleSingleDecrement(item)
                    }
                  >
                    -
                  </button>
                  <span style={{ margin: "0 6px" }}>{item.qnty}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </td>
                <td>{item.price * item.qnty}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" />
              <td>Items:</td>
              <td>{totalQuantity}</td>
              <td>Total: {totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </aside>
  );
};

export default Cart;
