import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import AdminSideBar from "./AdminSideBar";
import Navbar from "../pages/Navbar";
import { useAuth } from "../context/AuthContext";

const CreateTransport = () => {
  const { authUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    transportName: "",
    transportImage: null,
    vehicleType: [],
    transportNumber: "",
    location: "",
    popular: "",
    load: "",
    ratings: "",
  });

  const [transportImage, setTransportImage] = useState("");

  const handleImage = (e) => {
    setTransportImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      // Handle multiple selections for vehicleType
      const updatedVehicleTypes = checked
        ? [...formData.vehicleType, value]
        : formData.vehicleType.filter((type) => type !== value);

      setFormData({
        ...formData,
        vehicleType: updatedVehicleTypes,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      transportName,
      vehicleType,
      transportNumber,
      location,
      popular,
      load,
      ratings,
    } = formData;

    const formDataToSend = new FormData();

    formDataToSend.append("transportName", transportName);
    formDataToSend.append("transportImage", transportImage);
    vehicleType.forEach((type) => {
      formDataToSend.append("vehicleType", type);
    });
    formDataToSend.append("transportNumber", transportNumber);
    formDataToSend.append("location", location);
    formDataToSend.append("popular", popular);
    formDataToSend.append("load", load);
    formDataToSend.append("ratings", ratings);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-transport`,
        formDataToSend,
        {
          headers: {
            Authorization: `${authUser?.token}`,
          },
        }
      );

      toast.success(response?.data?.msg, { position: "top-center" });

      // Reset form after successful submission
      setFormData({
        transportName: "",
        vehicleType: [],
        transportImage: null,
        transportNumber: "",
        location: "",
        popular: "",
        load: "",
        ratings: "",
      });

      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to create transport.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const vehicles = ["Bus", "Car", "Bike", "Truck", "Van", "Container", "Crane"];

  return (
    <Wrapper>
      <Navbar />
      <div className="main_container">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <AdminSideBar />
            </div>
            <div className="col-sm-8 text-center text-dark main">
              <div className="form_container">
                <h1 className="form_title">Create Transport</h1>
                <Form onSubmit={handleSubmit}>
                  <div className="form_group">
                    <div className="input_field">
                      <label>Transport Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Transport Name"
                        name="transportName"
                        value={formData.transportName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input_field">
                      <label>Transport Number</label>
                      <input
                        required
                        type="text"
                        placeholder="Transport Number"
                        name="transportNumber"
                        value={formData.transportNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="input_field">
                    <label>Vehicle Type</label>
                    <div
                      className="checkbox_group"
                      style={{ fontSize: "17px" }}
                    >
                      {vehicles.map((vehicle) => (
                        <label key={vehicle}>
                          <input
                            type="checkbox"
                            name="vehicleType"
                            value={vehicle}
                            checked={formData.vehicleType.includes(vehicle)}
                            onChange={handleChange}
                          />
                          {vehicle}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form_group">
                    <div className="input_field">
                      <label>Transport Image</label>
                      <input
                        type="file"
                        name="transportImage"
                        onChange={handleImage}
                        accept="image/*"
                      />
                    </div>
                    {transportImage && (
                      <img
                        src={URL.createObjectURL(transportImage)}
                        alt="Transport"
                        style={{ width: "100px", marginTop: "10px" }}
                      />
                    )}
                  </div>

                  <div className="form_group">
                    <div className="input_field">
                      <label>Location</label>
                      <input
                        required
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form_group">
                    <div className="input_field">
                      <label>Popular</label>
                      <select
                        required
                        name="popular"
                        value={formData.popular}
                        onChange={handleChange}
                      >
                        <option value="" hidden>
                          Popular
                        </option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </div>
                    <div className="input_field">
                      <label>Load Type</label>
                      <select
                        required
                        name="load"
                        value={formData.load}
                        onChange={handleChange}
                      >
                        <option value="" hidden>
                          Select Load Type
                        </option>
                        <option value="Full Load">Full Load</option>
                        <option value="Part Load">Part Load</option>
                      </select>
                    </div>
                  </div>

                  <div className="input_field">
                    <label>Ratings</label>
                    <input
                      required
                      type="number"
                      placeholder="Ratings"
                      name="ratings"
                      value={formData.ratings}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      step="0.1" // This allows decimal values with one decimal place
                    />
                  </div>

                  <button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Transport"}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateTransport;

// Styled Components
const Wrapper = styled.section`
  .main_container {
    height: 100%;
    background-color: #f8f9fa;
    padding: 20px;
  }

  .form_container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .form_container {
      margin-top: 15px;
    }
  }

  .form_title {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .form_group {
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .input_field {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-weight: bold;
      color: #333;
    }

    input,
    select {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      width: 100%;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #007bff;
        outline: none;
      }
    }
  }

  .checkbox_group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  button {
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;
