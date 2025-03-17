import React, { useState } from "react";
import logo from "../assets/Images/logo.png";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import LoginPopup from "./LoginPopup";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { FaTruckMoving } from "react-icons/fa";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { authUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dropdown styles and menu items
  const dropStyle = {
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "sans-serif",
    textDecoration: "none",
  };

  // Stylish Nav-Link Style
  const Navstyle = ({ isActive }) => ({
    color: isActive ? "#34c3eb" : "#333",
    fontSize: isActive ? "19px" : "19px",
    fontWeight: isActive ? "bold" : "bold",
    textDecoration: isActive ? "underline" : "none",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
  });

  const items = [
    {
      label: (
        <Link
          style={dropStyle}
          rel="noopener noreferrer"
          to={authUser?.user?.role === 1 ? "/dashboard/admin" : "/booking"}
        >
          {authUser?.user?.role === 1 ? "Dashboard" : "Booking"}
        </Link>
      ),
      key: "1",
      icon: <FaTruckMoving style={{ fontSize: "18px" }} />,
    },
    {
      label: (
        <div rel="noopener noreferrer" onClick={logout} style={dropStyle}>
          Logout
        </div>
      ),
      key: "2",
      icon: <LogoutOutlined style={{ fontSize: "18px" }} />,
    },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Wrapper>
      <header className="header_section">
        <div className="header_container">
          {/* Logo */}
          <div className="logo-box">
            <img src={logo} alt="Transportz Logo" />
            <span>Transportz</span>
          </div>

          {/* Mobile Menu Toggle Icon */}
          <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <RxCross2 size={24} style={{ zIndex: 600 }} />
            ) : (
              <FaBars size={24} style={{ zIndex: 600 }} />
            )}
          </div>

          {/* Navigation Links */}
          <nav className={`navbar ${isMobileMenuOpen ? "open" : ""}`}>
            <ul className="navbar-nav">
              <li>
                <NavLink
                  className="nav-link"
                  style={Navstyle}
                  to="/"
                  onClick={toggleMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link"
                  to="/about"
                  onClick={toggleMobileMenu}
                  style={Navstyle}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link"
                  to="/service"
                  onClick={toggleMobileMenu}
                  style={Navstyle}
                >
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link"
                  to="/contact"
                  onClick={toggleMobileMenu}
                  style={Navstyle}
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                {!authUser ? (
                  <NavLink
                    className="nav-link"
                    onClick={() => {
                      setShowLogin(true);
                      toggleMobileMenu();
                    }}
                    style={{
                      fontSize: "19px",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </NavLink>
                ) : (
                  <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    overlayStyle={{ minWidth: "150px" }}
                  >
                    <span
                      className="dropdown-user p-2 "
                      style={{
                        border: "1px solid #34c3eb",
                        borderRadius: "8px",
                      }}
                    >
                      <UserOutlined
                        style={{
                          fontSize: "18px",
                          fontWeight: 900,
                          color: "green",
                          marginTop: "10px",
                          marginRight: "8px",
                        }}
                      />
                      {authUser?.user?.name[0].toUpperCase() +
                        authUser?.user?.name.slice(1).split(" ")[0]}
                    </span>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {/* Render Login Popup if active */}
        {showLogin && (
          <LoginPopup setShowLogin={setShowLogin} showLogin={showLogin} />
        )}
      </header>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.section`
  /* General Header Styles */
  .header_section {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    position: relative;
    z-index: 10;
  }

  .header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo-box {
    display: flex;
    align-items: center;
  }

  .logo-box img {
    width: 50px;
    margin-right: 10px;
  }

  .logo-box span {
    font-size: 22px;
    font-weight: bold;
    color: #0a0057;
    font-family: "Roboto", sans-serif;
  }

  /* Mobile Menu Icon */
  .mobile-menu-icon {
    display: none;
    cursor: pointer;
  }

  /* Navbar Styles */
  .navbar {
    display: flex;
    gap: 20px;
    align-items: center;
    transition: transform 0.3s ease-in-out;
  }

  .navbar-nav {
    display: flex;
    list-style: none;
    gap: 15px;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    padding: 8px 12px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
  }

  .dropdown-user {
    cursor: pointer;
    font-weight: 600;
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .mobile-menu-icon {
      display: block; /* Show mobile menu toggle icon */
    }

    .navbar {
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background-color: #f8f9fa;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      transform: translateY(-200%);
    }

    .navbar.open {
      transform: translateY(0);
    }

    .navbar-nav {
      flex-direction: column; /* Stack nav items vertically */
      gap: 10px;
    }

    .nav-link {
      width: 100%; /* Make nav links full width */
      text-align: left;
    }
  }

  @media (min-width: 769px) {
    .navbar {
      position: static;
      flex-direction: row; /* Horizontally align nav items */
      transform: translateY(0); /* Reset transform */
    }

    .navbar-nav {
      flex-direction: row; /* Ensure horizontal layout */
    }

    .nav-link {
      width: auto;
      text-align: center; /* Reset text alignment */
    }
  }
`;
