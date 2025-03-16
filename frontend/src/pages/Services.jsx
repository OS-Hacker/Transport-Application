import React from "react";
import service_1 from "../assets/Images/service-1.jpg";
import service_2 from "../assets/Images/service-2.jpg";
import service_3 from "../assets/Images/service-3.jpg";
import Navbar from "./Navbar";
import styled from "styled-components";

const Services = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <section className="service_section layout_padding">
          <div className="container">
            <div className="d-flex justify-content-center">
              <h2 className="heading_style">Our Services</h2>
            </div>
            <div className="row layout_padding2-top">
              <div className="col-md-4">
                <div className="service_img-box s-b-1">
                  <img src={service_1} alt="Cargo Service" />
                  <div className="d-flex">
                    <h3>CARGO</h3>
                  </div>
                </div>
                <div className="service-detail">
                  <p>
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.Excepteur
                  </p>
                  <div className="d-flex justify-content-end">
                    <a to="/cargo" className="service-btn">
                      See More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service_img-box s-b-2">
                  <img src={service_2} alt="Logistic Service" />
                  <div className="d-flex">
                    <h3>LOGISTIC SERVICE</h3>
                  </div>
                </div>
                <div className="service-detail">
                  <p>
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.Excepteur
                  </p>
                  <div className="d-flex justify-content-end">
                    <a to="/logistic-service" className="service-btn">
                      See More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service_img-box s-b-3">
                  <img src={service_3} alt="Storage Service" />
                  <div className="d-flex">
                    <h3>STORAGE</h3>
                  </div>
                </div>
                <div className="service-detail">
                  <p>
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.Excepteur
                  </p>
                  <div className="d-flex justify-content-end">
                    <a to="/storage" className="service-btn">
                      See More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .container {
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .service_img-box {
    position: relative;
  }

  .heading_style {
    margin: 20px 0px;
  }
  .service_img-box h3 {
    position: absolute;
    left: 0;
    bottom: 0;
    text-transform: uppercase;
    color: #fff;
    font-weight: lighter;
    padding: 10px 15px;
    padding-right: 35px;
    margin: 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .s-b-1 h3 {
    background-image: url("../assets/Images/hbg.png");
  }

  .s-b-2 h3 {
    background-image: url("../assets/Images/hbg-2.png");
  }

  .s-b-3 h3 {
    background-image: url("../assets/Images/hbg-3.png");
  }

  .service_img-box img {
    width: 100%;
  }

  .service-btn,
  .service-btn:hover {
    padding: 7px 12px;
    background-color: #0a0057;
    color: #fff;
  }
`;

export default Services;
