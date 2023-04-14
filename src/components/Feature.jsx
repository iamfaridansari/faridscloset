import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const Feature = () => {
  const { feature } = useContext(ProductContext);
  return (
    <div className="container">
      <h1 className="text-center mb-4">Our best sellers</h1>
      <div className="product-container">
        {feature.slice(0, 4).map((item, index) => {
          return <ProductCard key={index} product={item} />;
        })}
      </div>
    </div>
  );
};

export default Feature;
