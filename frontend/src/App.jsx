import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./pages/Footer";
import { useAuth } from "./context/AuthContext";
import Booking from "./components/Booking";
import AdminPrivateRoute from "./Admin/AdminPrivateRoute";
import AdminDeshbored from "./Admin/AdminDeshbored";
import CreateTransport from "./Admin/CreateTransport";
import ShowTransport from "./Admin/ShowTransport";
import Bookings from "./Admin/Bookings";
import UpdateTransport from "./Admin/UpdateTransport";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const { authUser, setAuthUser } = useAuth();

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/booking"
          element={authUser?.user ? <Booking /> : <Home />}
        />
        <Route path="*" element={<ErrorPage />} />

        {/* admin routes */}
        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDeshbored />} />
          <Route path="admin/create-transport" element={<CreateTransport />} />
          <Route path="admin/show-transport" element={<ShowTransport />} />
          <Route
            path="admin/update-transport/:id"
            element={<UpdateTransport />}
          />
          <Route path="admin/bookings" element={<Bookings />} />
        </Route>
      </Routes>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
