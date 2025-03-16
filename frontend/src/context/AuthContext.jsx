import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return null;
    }
  });

  const Navigate = useNavigate();

  // Logout function
  const logout = () => {
    setAuthUser(null); // Clear user state
    localStorage.removeItem("user"); // Remove user data from localStorage
    toast.success("Logout Successful", { position: "top-center" });
    Navigate("/");
    delete axios.defaults.headers.common["Authorization"]; // Remove token from axios headers
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
