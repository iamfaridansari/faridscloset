import React, { createContext, useState, useRef, useEffect } from "react";
const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const backendAPI = "https://server-application.onrender.com";
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await fetch(backendAPI + "/api/get/faridscloset/products");
    const data = await res.json();
    console.log(data);
    //
    if (res.status === 200) {
      setProducts(data);
    }
  };
  //
  const rearrange = (data) => {
    let currentIndex = data.length;
    let randomIndex = "";

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [data[currentIndex], data[randomIndex]] = [
        data[randomIndex],
        data[currentIndex],
      ];
    }
    return data;
  };
  //
  useEffect(() => {
    fetchProducts();
  }, []);
  //
  const [newProducts, setNewProducts] = useState([]);
  useEffect(() => {
    if (products.length !== 0) {
      setNewProducts(rearrange(products));
    }
  }, [products]);

  //
  const alertModal = useRef(null);
  const [alertMsg, setAlertMsg] = useState("");
  function hideAlertModal() {
    setTimeout(() => {
      alertModal.current.classList.remove("active");
    }, 1000);
  }
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        newProducts,
        setNewProducts,
        alertModal,
        hideAlertModal,
        alertMsg,
        setAlertMsg,
        backendAPI,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
