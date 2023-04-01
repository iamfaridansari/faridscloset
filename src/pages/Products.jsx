import React, { useContext } from "react";
import AlertModal from "../components/AlertModal";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import { ProductContext } from "../context/ProductContext";

const Products = () => {
  const { products } = useContext(ProductContext);
  return (
    <>
      <SearchFilter />
      <AlertModal />
      <div className="container mt-4">
        {products.length === 0 ? (
          <p className="text-center my-4">No product to show.</p>
        ) : (
          <div className="product-container">
            {products.map((item, index) => {
              return <ProductCard key={index} product={item} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
