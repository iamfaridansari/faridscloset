import React, { createContext, useState, useRef, useEffect } from "react";
const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const backendAPI = "https://server-application.onrender.com";
  const [products, setProducts] = useState([]);
  const [feature, setFeature] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(backendAPI + "/api/get/faridscloset/products");
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setProducts(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      setFeature(products.slice(0, 4));
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
        loading,
        feature,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
