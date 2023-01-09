import React from "react";
import ProductCard from "./ProductCard";
import productsData from "../data/productsData";

const Feature = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-4">Our best sellers</h1>
      <div className="product-container">
        {productsData.map((item, index) => {
          if (item.feature) {
            return <ProductCard key={index} product={item} />;
          }
        })}
      </div>
    </div>
  );
};

export default Feature;
