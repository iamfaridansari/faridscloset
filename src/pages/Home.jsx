import React from "react";
import About from "../components/About";
import Carousel from "../components/Carousel";
import Feature from "../components/Feature";
import AlertModal from "../components/AlertModal";

const Home = () => {
  return (
    <>
      <AlertModal />
      <Carousel />
      <About />
      <Feature />
    </>
  );
};

export default Home;
