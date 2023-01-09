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
            <h1>Lorem ipsum dolor sit.</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem, consequuntur?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              qui cumque at officia, nisi eveniet reprehenderit blanditiis
              architecto aperiam, odit quod maiores facere a. Maxime dolores
              officia sapiente nostrum at voluptates cum commodi porro hic
              nesciunt, ab pariatur culpa delectus cupiditate fuga adipisci quo.
              Error at mollitia commodi tempora corrupti!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
