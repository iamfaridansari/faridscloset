import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const { alertModal, hideAlertModal, setAlertMsg } =
    useContext(ProductContext);
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
      setAlertMsg("Item added to cart");
      alertModal.current.classList.add("active");
      alertModal.current.classList.replace("redbg", "greenbg");
      hideAlertModal();
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
      setAlertMsg("Item already in the cart");
      alertModal.current.classList.add("active");
      alertModal.current.classList.replace("redbg", "greenbg");
      hideAlertModal();
    }
  };
  //
  const addToWishlist = (product) => {
    const inWishlist = wishlist.find((item) => {
      return item.id === product.id;
    });
    if (!inWishlist) {
      setWishlist([...wishlist, product]);
      setAlertMsg("Item added to wishlist");
      alertModal.current.classList.add("active");
      alertModal.current.classList.replace("redbg", "greenbg");
      hideAlertModal();
    } else {
      const filtered = wishlist.filter((item) => {
        return item.id !== product.id;
      });
      setWishlist(filtered);
      setAlertMsg("Item removed from wishlist");
      alertModal.current.classList.add("active");
      alertModal.current.classList.replace("greenbg", "redbg");
      hideAlertModal();
    }
  };
  //
  return (
    <>
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
    </>
  );
};

export default ProductCard;
