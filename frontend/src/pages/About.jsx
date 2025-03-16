import React from "react";
import truck from "../assets/Images/a-truck.jpg";
import next from "../assets/Images/white-next.png";
import Navbar from "./Navbar";
import styled from "styled-components";

const About = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <section className="about_section layout_padding2-bottom">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="heading_style">About Us</h2>
                <p className="intro_text">
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="about_img-box">
                  <img src={truck} alt="Truck" className="img-fluid" />
                </div>
              </div>
              <div className="col-md-6 about_detail-container">
                <div className="about_detail-box">
                  <h3>Company and Transport</h3>
                  <p className="para">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna as
                  </p>
                  <div className="d-flex justify-content-end">
                    <a href="/about" className="quote-btn about-btn">
                      <img src={next} alt="Learn More" />
                      <span> About More </span>
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

export default About;

const Wrapper = styled.section`
  /* about section */
  .about_section {
    padding-top: 50px;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
  }

  .para {
    padding: 3px;
  }

  .container {
    margin-top: 10px;
    margin-bottom: 40px;
  }

  .about_section::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 65px;
    height: 120px;
    transform: translateY(-50%);
    background-image: url("../assets/Images/circle-bg.jpg");
    background-size: cover;
    z-index: 1;
  }

  .about_section .col-md-6 {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .about_detail-container {
    position: relative;
    z-index: 2;
  }

  .about_detail-container::before {
    content: "";
    position: absolute;
    width: 150%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #02caf0;
    z-index: -1;
    transform: skewX(-15deg);
  }

  .about_detail-box {
    padding: 25px 50px;
    padding-right: 0;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .about_detail-box h3,
  .about_detail-box p {
    text-align: right;
  }

  .about_detail-box h3 {
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .about_detail-box p {
    margin: 20px 0;
    color: #555;
    line-height: 1.8;
  }

  .about-btn {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #02caf0;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #0199c2;
      transform: translateX(5px);
    }
  }

  .about-btn img {
    margin-right: 10px;
    transform: rotate(180deg);
    width: 20px;
    height: 20px;
  }

  .about_img-box {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .about_img-box img {
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .about_img-box::before {
    content: "";
    width: 18%;
    height: 10%;
    background-color: #02caf0;
    position: absolute;
    right: 0;
    bottom: 25%;
    z-index: 1;
  }

  .about_img-box::after {
    content: "";
    position: absolute;
    width: 18%;
    height: 10%;
    right: 0;
    bottom: 25%;
    background-image: url("../assets/Images/white-next.png");
    background-size: 20px;
    background-position: 15px;
    background-repeat: no-repeat;
    z-index: 2;
  }

  .intro_text {
    font-size: 1.1rem;
    color: #666;
    text-align: center;
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    .about_section::before {
      display: none;
    }

    .para {
      padding: 0px;
    }

    .about_detail-container::before {
      width: 100%;
      transform: skewX(0);
    }

    .about_detail-box {
      padding: 20px;
      text-align: center;
    }

    .about_detail-box h3,
    .about_detail-box p {
      text-align: center;
    }

    .about-btn {
      justify-content: center;
    }

    .about_img-box {
      margin-bottom: 20px;
    }
  }

  @media (max-width: 576px) {
    .about_detail-box {
      padding: 15px;
    }

    .para {
      padding: 0px;
    }
    .about-btn {
      padding: 8px 15px;
      font-size: 0.9rem;
    }

    .about-btn img {
      width: 15px;
      height: 15px;
    }
  }
`;
