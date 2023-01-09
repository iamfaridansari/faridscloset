import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const addToCart = (product) => {
    let inCart = cart.find((item) => {
      return item.id === product.id;
    });
    if (!inCart) {
      product = {
        ...product,
        quantity: 1,
        total: product.price,
        wishlist: false,
      };
      setCart([...cart, product]);
    } else if (inCart) {
      const updateQuantity = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            total: (item.quantity + 1) * product.price,
          };
        }
        return item;
      });
      setCart(updateQuantity);
    }
  };
  //
  const addToWishlist = (product) => {
    const inWishlist = wishlist.find((item) => {
      return item.id === product.id;
    });
    if (!inWishlist) {
      setWishlist([...wishlist, product]);
    } else {
      const filtered = wishlist.filter((item) => {
        return item.id !== product.id;
      });
      setWishlist(filtered);
    }
  };
  //
  return (
    <div className="product">
      <div className="img">
        <img src={product.img} alt="" />
      </div>
      <div className="my-2">
        <p className="text-capitalize">{product.title}</p>
        <p>
          Rs. <strong>{product.price}</strong>
        </p>
      </div>
      <div className="d-flex align-items-stretch justify-content-between gap-2 custom-flex-column">
        <button
          className="add-to-cart w-100"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
        <button onClick={() => addToWishlist(product)}>
          <FaHeart className="SVGdisable" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
