import React, { useState, useEffect, useRef } from "react";
import cross_icon from "../assets/Images/cross_icon.png";
import { styled } from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const LoginPopup = ({ showLogin, setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { authUser, setAuthUser } = useAuth();

  // get input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // validation
  const validateForm = () => {
    if (currState === "Sign Up" && !formData.name.trim()) {
      toast.error("Name is required", { position: "top-center" });
      return false;
    }
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Email and password are required", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  // sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signUp`,
        formData
      );

      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data));
        toast.success(data.msg, { position: "top-center" });
        setAuthUser(data);
        setFormData({ name: "", number: "", email: "", password: "" });
        setShowLogin(false); // Close popup after successful sign-up
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        "An unexpected error occurred. Please try again later.";
      toast.error(errorMessage, { position: "top-center" });
      console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        formData
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data));
        toast.success(data.msg, { position: "top-center" });
        setAuthUser(data);
        setFormData({ name: "", email: "", password: "" });
        setShowLogin(false); // Close popup after successful login
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        "An unexpected error occurred. Please try again later.";
      toast.error(errorMessage, { position: "top-center" });
      console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    showLogin && (
      <Wrapper>
        <div className="login-popup" style={{ zIndex: "10" }}>
          <form
            onSubmit={currState === "Sign Up" ? handleSignUp : handleLogin}
            className="login-popup-container"
          >
            <div className="login-popup-title">
              <h2>{currState}</h2>
              <img
                onClick={() => setShowLogin(false)}
                src={cross_icon}
                alt="Close"
                aria-label="Close popup"
              />
            </div>

            <div className="login-popup-inputs">
              {currState === "Sign Up" && (
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-label="Your Name"
                />
              )}
              {currState === "Sign Up" && (
                <input
                  type="text"
                  placeholder="Your Number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  aria-label="Your Name"
                />
              )}
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-label="Your Email"
              />
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-label="Password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                  role="button"
                  tabIndex={0}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"} {/* Toggle button text */}
                </span>
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading
                ? "Loading..."
                : currState === "Sign Up"
                ? "Create account"
                : "Login"}
            </button>

            {currState === "Login" ? (
              <p>
                Create a new account?{" "}
                <span onClick={() => setCurrState("Sign Up")}>Click here</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setCurrState("Login")}>Login here</span>
              </p>
            )}
          </form>
        </div>
      </Wrapper>
    )
  );
};

export default LoginPopup;

const Wrapper = styled.section`
  .login-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000090;
    display: grid;
    place-items: center;
  }

  .login-popup-container {
    width: max(23vw, 330px);
    color: #808080;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 25px 30px;
    border-radius: 8px;
    font-size: 14px;
    animation: fadeIn 0.5s;
  }

  .login-popup-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
  }

  .login-popup-title img {
    width: 16px;
    cursor: pointer;
  }

  .login-popup-inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .login-popup-inputs input {
    outline: none;
    border: 1px solid #c9c9c9;
    padding: 10px;
    border-radius: 4px;
  }

  .password-input-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .password-input-container input {
    width: 100%;
    padding-right: 40px; /* Add padding to prevent text overlap */
  }

  .password-input-container span {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: rgb(0, 118, 215);
    font-weight: 500;
    user-select: none; /* Prevent text selection */
  }

  .login-popup-container button {
    border: none;
    padding: 10px;
    border-radius: 4px;
    color: white;
    background-color: rgb(0, 118, 215);
    font-size: 15px;
    cursor: pointer;
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .login-popup p span {
    color: rgb(0, 118, 215);
    font-weight: 500;
    cursor: pointer;
  }
`;
