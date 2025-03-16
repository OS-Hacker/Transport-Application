import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import AdminSideBar from "./AdminSideBar";
import { useAuth } from "../context/AuthContext";
import Navbar from "../pages/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTransport = () => {
  const { authUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams(); // Get the transport ID from the URL

  const Navigate = useNavigate();

  // State to hold the fetched transport data
  const [singleData, setSingleData] = useState({
    transportName: "",
    transportImage: null,
    vehicleType: [],
    transportNumber: "",
    location: "",
    popular: "",
    load: "",
    ratings: "",
  });

  // Fetch the transport data when the component mounts
  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/single-transport/${id}`,
          {
            headers: {
              Authorization: `${authUser?.token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.transport;
          setSingleData({
            transportName: data.transportName,
            transportImage: data.transportImage,
            vehicleType: data.vehicleType,
            transportNumber: data.transportNumber,
            location: data.location,
            popular: data.popular,
            load: data.load,
            ratings: data.ratings,
          });
        }
      } catch (error) {
        console.error("Error fetching transport:", error);
        toast.error("Failed to fetch transport data.");
      }
    };

    fetchTransport();
  }, [id, authUser?.token]);

  // Handle file input change
  const handleImage = (e) => {
    setSingleData({
      ...singleData,
      transportImage: e.target.files[0],
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle multiple selections for vehicleType
      const updatedVehicleTypes = checked
        ? [...singleData.vehicleType, value]
        : singleData.vehicleType.filter((type) => type !== value);

      setSingleData({
        ...singleData,
        vehicleType: updatedVehicleTypes,
      });
    } else {
      setSingleData({
        ...singleData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("transportName", singleData.transportName);
    if (singleData.transportImage) {
      formDataToSend.append("transportImage", singleData.transportImage);
    }
    singleData.vehicleType.forEach((type) => {
      formDataToSend.append("vehicleType", type);
    });
    formDataToSend.append("transportNumber", singleData.transportNumber);
    formDataToSend.append("location", singleData.location);
    formDataToSend.append("popular", singleData.popular);
    formDataToSend.append("load", singleData.load);
    formDataToSend.append("ratings", singleData.ratings);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/update-transport/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `${authUser?.token}`,
          },
        }
      );
      toast.success(response?.data?.msg, { position: "top-center" });
      Navigate("/dashboard/admin/show-transport");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
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
            <div className="col-sm-8 text-center text-dark">
              <div className="form_container">
                <h1 className="form_title">Update Transport</h1>
                <Form onSubmit={handleSubmit}>
                  <div className="form_group">
                    <div className="input_field">
                      <label>Transport Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Transport Name"
                        name="transportName"
                        value={singleData.transportName}
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
                        value={singleData.transportNumber}
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
                            checked={singleData.vehicleType.includes(vehicle)}
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
                    {singleData.transportImage && (
                      <img
                        src={
                          typeof singleData.transportImage === "string"
                            ? singleData.transportImage
                            : URL.createObjectURL(singleData.transportImage)
                        }
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
                        value={singleData.location}
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
                        value={singleData.popular}
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
                        value={singleData.load}
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
                      value={singleData.ratings}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      step="0.1"
                    />
                  </div>

                  <button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Transport"}
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

export default UpdateTransport;

// Styled Components (same as before)
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
