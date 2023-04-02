import React, { useContext, useEffect, useRef } from "react";
import { GiStrikingDiamonds } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  //
  const navbar = useRef(null);
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        navbar.current.classList.add("shadow");
      } else if (window.scrollY < 50) {
        navbar.current.classList.remove("shadow");
      }
    };
  }, []);
  return (
    <nav
      className="navbar navbar-expand-sm bg-white border-bottom"
      id="navbar"
      ref={navbar}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Farid's closet <GiStrikingDiamonds />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">
                Wishlist{" "}
                <span className="badge bg-dark">
                  <p>{wishlist.length}</p>
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart{" "}
                <span className="badge bg-dark">
                  <p>{cart.length}</p>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
