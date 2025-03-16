import { Modal } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { vehicleData } from "./Data"; // Ensure this import points to your data file
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify"; // Import toast for notifications

const BookingModal = ({
  handleCancel,
  isModalOpen,
  handleOk,
  selectedTransportId,
}) => {
  // State to manage form fields
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [models, setModels] = useState([]);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [selectedCost, setSelectedCost] = useState(0);
  const [costDetails, setCostDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const { authUser } = useAuth();

  // Handle vehicle selection
  const handleVehicleChange = (event) => {
    const selectedVehicleName = event.target.value;
    setSelectedVehicle(selectedVehicleName);

    // Find the selected vehicle and update the models and cost data
    const selectedVehicleData = vehicleData.vehicles.find(
      (vehicle) => vehicle.name === selectedVehicleName
    );
    setModels(selectedVehicleData ? selectedVehicleData.models : []);
    setCostDetails(selectedVehicleData ? selectedVehicleData.costData : []);
    setSelectedCost(""); // Reset cost when vehicle changes
  };

  // Handle cost selection
  const handleCostChange = (event) => {
    setSelectedCost(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare form data
    const formData = {
      transportId: selectedTransportId,
      name,
      number,
      vehicle: selectedVehicle,
      model: models.join(", "), // Join models into a single string
      pickup,
      destination,
      date: new Date(date).toISOString(), // Convert date to ISO string
      cost: +selectedCost,
    };

    setIsLoading(true); // Set loading state

    try {
      // Send POST request to create booking
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-booking`,
        formData,
        {
          headers: {
            Authorization: `${authUser?.token}`,
          },
        }
      );

      // Show success message
      toast.success(response?.data?.msg, { position: "top-center" });

      // Close the modal and reset form
      handleOk();
      resetForm();
    } catch (error) {
      // Show error message
      toast.error(error?.response?.data?.msg || { position: "top-center" });
      console.error(error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Reset form fields
  const resetForm = () => {
    setName("");
    setNumber("");
    setSelectedVehicle("");
    setModels([]);
    setPickup("");
    setDestination("");
    setDate("");
    setSelectedCost("");
    setCostDetails([]);
  };

  return (
    <Wrapper>
      <Modal
        title="Booking Form"
        open={isModalOpen}
        onOk={handleSubmit} // Use handleSubmit for form submission
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
        width={600} // Set modal width
        style={{ zIndex: 1000, textAlign: "center" }}
      >
        <Form onSubmit={handleSubmit}>
          <div className="form_group">
            <div className="input_field">
              <label>Full Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input_field">
              <label>Mobile Number</label>
              <input
                required
                type="text"
                placeholder="Mobile Number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="form_group">
            <div className="input_field">
              {/* Vehicle Dropdown */}
              <label htmlFor="vehicle">Select Vehicle: </label>
              <select
                id="vehicle"
                value={selectedVehicle}
                onChange={handleVehicleChange}
                required
              >
                <option value="" hidden>
                  Select a Vehicle
                </option>
                {vehicleData.vehicles.map((vehicle, index) => (
                  <option key={index} value={vehicle.name}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input_field">
              {/* Model Dropdown */}
              <label htmlFor="model">Select Model: </label>
              <select id="model" disabled={!selectedVehicle} required>
                <option value="" hidden>
                  Select a Model
                </option>
                {models.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input_field">
            <label>Pickup</label>
            <input
              required
              type="text"
              placeholder="Pickup"
              name="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
          <div className="input_field">
            <label>Destination</label>
            <input
              required
              type="text"
              placeholder="Destination"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="form_group">
            <div className="input_field">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="input_field">
              <label>Cost</label>
              <select
                value={selectedCost}
                onChange={handleCostChange}
                disabled={!selectedVehicle}
                required
              >
                <option value="" hidden>
                  Select Cost
                </option>
                {costDetails.map((cost, index) => (
                  <option key={index} value={cost.cost}>
                    {cost.perKm}: ₹{cost.cost}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default BookingModal;

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
