import React, { createContext, useState, useRef } from "react";
import productsData from "../data/productsData";
const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);
  const alertModal = useRef(null);
  const [alertMsg, setAlertMsg] = useState("");
  function hideAlertModal() {
    setTimeout(() => {
      alertModal.current.classList.remove("active");
    }, 2000);
  }
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        alertModal,
        hideAlertModal,
        alertMsg,
        setAlertMsg,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
