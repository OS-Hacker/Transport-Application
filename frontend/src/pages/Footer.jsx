import React from "react";
import white from "../assets/Images/logo-white.png";
import fb from "../assets/Images/fb.png";
import twitter from "../assets/Images/twitter.png";
import plus from "../assets/Images/g-plus.png";
import linkedin from "../assets/Images/linkedin.png";
import styled from "styled-components";
import infoImage from "../assets/Images/info-bg.png";

const Footer = () => {
  return (
    <Wrapper>
      <section
        className="info_section"
        style={{
          backgroundImage: `url(${infoImage})`,
        }}
      >
        <div className="container">
          <div className="row mb-3 pb-4">
            <div className="col-md-3 info_logo">
              <div className="logo-box">
                <img src={white} alt="Transportz Logo" />
                <span>Transportz</span>
              </div>
              <p className="m">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                consectetur
              </p>
              <div className="info_social">
                <div>
                  <a href="https://facebook.com">
                    <img src={fb} alt="Facebook" />
                  </a>
                </div>
                <div>
                  <a href="https://twitter.com">
                    <img src={twitter} alt="Twitter" />
                  </a>
                </div>
                <div>
                  <a href="https://plus.google.com">
                    <img src={plus} alt="Google Plus" />
                  </a>
                </div>
                <div>
                  <a href="https://linkedin.com">
                    <img src={linkedin} alt="LinkedIn" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 info_address">
              <h5>Address</h5>
              <p>Healing Center, 176 W Street name, New York, NY 10014, US</p>
              <p>(+71) 8522369417</p>
              <p>(+71) 8522369417</p>
              <p>
                <a href="mailto:transportz@gmail.com">transportz@gmail.com</a>
              </p>
            </div>
            <div className="col-md-3 info_links">
              <div className="info_nav">
                <nav>
                  <ul>
                    <h5>Links</h5>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/about">About</a>
                    </li>
                    <li>
                      <a href="/service">Service</a>
                    </li>
                    <li>
                      <a href="/shop">Shop</a>
                    </li>
                    <li>
                      <a href="/company">Company</a>
                    </li>
                    <li>
                      <a href="/contact">Contact us</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-md-3 info_news">
              <h5>Newsletter</h5>
              <form action="">
                <div>
                  <input type="text" placeholder="Your Name" />
                </div>
                <div>
                  <input type="email" placeholder="Email" />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid footer_section">
        <p>Copyright &copy; 2025 All Rights Reserved</p>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .info_section {
    padding-top: 150px;
    padding-bottom: 1px;
    color: #fff;
    background-size: cover;
    background-repeat: no-repeat;
    font-family: "Poppins", sans-serif;
  }

  .info_section h5 {
    font-size: 22px;
  }

  .info_section a,
  .info_section a:hover {
    color: #fff;
  }

  .info_logo .logo-box {
    padding-top: 0;
    margin-top: -10px;
  }

  .info_logo .logo-box img {
    width: 65px;
  }

  .info_logo .logo-box span {
    color: #fff;
  }

  .info_section .col-md-3 {
    padding: 0 30px;
  }

  .info_news {
    padding-right: 8%;
  }

  .info_news input {
    border: none;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background-color: #fff;
    outline: none;
    padding-left: 20px;
  }

  .info_news button {
    border: none;
    background-color: #78cffd;
    color: #fff;
    padding: 7px 12px;
    margin-top: 10px;
  }

  .info_nav nav {
    width: 70%;
    margin: 0 auto;
  }

  .info_nav ul {
    display: flex;
    flex-direction: column;
  }

  .info_nav ul li {
    list-style-type: none;
  }

  .info_nav ul li a {
    color: #fff;
  }

  .info_social {
    display: flex;
    justify-content: space-between;
    width: 150px;
  }

  .info_social a img {
    width: 30px;
  }

  .footer_section {
    background-color: #78cffd;
    padding: 20px 0;
    font-family: "Roboto", sans-serif;
  }

  .footer_section p {
    color: #fff;
    margin: 0;
    text-align: center;
  }

  .footer_section a {
    color: #fff;
  }

  /* Responsive Styles */
  @media (max-width: 992px) {
    .info_section .col-md-3 {
      flex: 0 0 50%; /* Two columns per row on medium screens */
      max-width: 50%;
      margin-bottom: 30px;
    }

    .m {
      visibility: hidden;
    }

    .info_news {
      padding-right: 0;
    }
  }

  @media (max-width: 768px) {
    .info_section .col-md-3 {
      flex: 0 0 100%; /* One column per row on small screens */
      max-width: 100%;
    }

    .m {
      visibility: hidden;
    }

    .info_logo .logo-box {
      text-align: center;
    }

    .info_social {
      justify-content: center;
      gap: 20px;
      width: 100%;
    }

    .info_nav nav {
      width: 100%;
    }

    .info_news input {
      width: 100%;
    }

    .info_news button {
      width: 100%;
      margin-top: 15px;
    }
  }

  @media (max-width: 480px) {
    .info_section {
      padding-top: 100px;
    }

    .m {
      visibility: hidden;
    }

    .info_section h5 {
      font-size: 20px;
    }

    .info_logo .logo-box img {
      width: 50px;
    }

    .info_logo .logo-box span {
      font-size: 18px;
    }

    .info_social a img {
      width: 25px;
    }

    .info_news input {
      height: 35px;
    }

    .info_news button {
      padding: 5px 10px;
    }
  }
`;

export default Footer;
