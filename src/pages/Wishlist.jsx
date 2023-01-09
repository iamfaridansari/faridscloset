import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);
  return (
    <div className="container mt-4">
      {wishlist.length !== 0 ? (
        <div className="product-container">
          {wishlist.map((item, index) => {
            return <ProductCard key={index} product={item} />;
          })}
        </div>
      ) : (
        <p className="text-center my-4">No item in wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;
