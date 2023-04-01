import React from "react";
import profile_pic from "../images/profile_pic.jpg";

const About = () => {
  return (
    <div className="container-fluid my-5 bg-light" id="about">
      <div className="container p-2 py-4 about">
        <div className="d-flex align-items-center justify-content-between flex-md-row flex-column gap-5">
          <div className="order-md-2">
            <img src={profile_pic} alt="" />
          </div>
          <div className="order-md-1 text-md-start text-center">
            <h1>About Farid's Closet.</h1>
            <p className="my-2">
              Farid's closet is an Ecommerec web application, design & built by
              Farid Ansari.
            </p>
            <p>
              I always wanted my wardrobe to be minimal and perfect. Basic solid
              tshirts, a good pair of denim jeans, some cargo's, never out of
              style shoes, formals, trendy accessories and many more cool
              costumes. Unfortunately, life isn't perfect to give me all of
              these outfits, so I tried to make my own imaginary wardrobe and be
              happy with it. I hope some day I will be furtunate enough to have
              my dream wardrobe in real life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
