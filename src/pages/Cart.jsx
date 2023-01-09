import React, { useContext } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import Summary from "../components/Summary";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  //
  const removeItem = (product) => {
    const filtered = cart.filter((item) => {
      return item.id !== product.id;
    });
    setCart(filtered);
  };
  //
  const increment = (product) => {
    const updatedQuantity = cart.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
          total: (item.quantity + 1) * product.price,
        };
      }
      return item;
    });
    setCart(updatedQuantity);
  };
  //
  const decrement = (product) => {
    const updatedQuantity = cart.map((item) => {
      if (item.id === product.id && item.quantity > 0) {
        return {
          ...item,
          quantity: item.quantity - 1,
          total: (item.quantity - 1) * product.price,
        };
      }
      return item;
    });
    const filtered = updatedQuantity.filter((item) => {
      return item.quantity > 0;
    });
    setCart(filtered);
  };
  return (
    <>
      <div className="container" style={{ overflowX: "auto" }}>
        {cart.length === 0 ? (
          <p className="text-center my-4">No item in the cart.</p>
        ) : (
          <table className="table table-bordered border-dark table-hover">
            <thead>
              <tr className="bg-dark">
                <th className="text-white">Sr.No.</th>
                <th className="text-white">Title</th>
                <th className="text-white">Price</th>
                <th className="text-white">Quantity</th>
                <th className="text-white">Total</th>
                <th className="text-white"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-capitalize">{item.title}</td>
                    <td>
                      Rs. <strong>{item.price}</strong>
                    </td>
                    <td className="text-center">
                      <div className="btn-group">
                        <button
                          className="btn btn-dark"
                          onClick={() => decrement(item)}
                        >
                          <FaMinus />
                        </button>
                        <button className="btn border border-dark">
                          {item.quantity}
                        </button>
                        <button
                          className="btn btn-dark"
                          onClick={() => increment(item)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td>
                      Rs. <strong>{item.total}</strong>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {cart.length !== 0 ? <Summary /> : ""}
    </>
  );
};

export default Cart;
