import React, { useState } from "react";
import styled from "styled-components";
import { useFilters } from "../context/FilterProvoder";
import { AiFillCaretDown } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const FilterNav = () => {
  const { selectedFilters, setSelectedFilters } = useFilters();
  const { authUser } = useAuth();

  // State to manage dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState({
    vehicleType: false,
    load: false,
    location: false,
    ratings: false,
  });

  // Toggle dropdown visibility
  const toggleDropdown = (filterType) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  // Handle filter selection
  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      switch (filterType) {
        case "vehicleType":
          // Toggle vehicle type in the array
          updatedFilters.vehicleType = prevFilters.vehicleType.includes(value)
            ? prevFilters.vehicleType.filter((type) => type !== value) // Remove if already selected
            : [...prevFilters.vehicleType, value]; // Add if not selected
          break;

        case "load":
          // Toggle load type
          updatedFilters.load = prevFilters.load === value ? "" : value;
          break;

        case "location":
          // Toggle location filter
          updatedFilters.location = prevFilters.location === value ? "" : value;
          break;

        case "ratings":
          // Toggle ratings filter
          updatedFilters.ratings = prevFilters.ratings === value ? "" : value;
          break;

        case "quickResponse":
          // Toggle quick response filter
          updatedFilters.quickResponse = value;
          break;

        case "popular":
          // Toggle popular filter
          updatedFilters.popular = value;
          break;

        default:
          break;
      }

      return updatedFilters; // Return the updated state
    });
  };

  const vehicles = ["Truck", "Van", "Container", "Crane", "Bus", "Car"];
  const location = ["Bangalore", "Pune", "Mumbai", "Hyderabad"];
  const ratings = [1, 2, 3, 4, 5]; // Rating options

  // form Handling
  const [formData, setFormData] = useState({
    name: "",
    number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData?.number?.length !== 10) {
      toast.success("Please  Enter Valid Number", { position: "top-center" });
      return;
    }

    if (!authUser?.user && !authUser?.token) {
      toast("Please Login", { position: "top-center" });
      return;
    }

    toast.success(`Thank U ${formData?.name} We Will Give Good Service`, {
      position: "top-center",
    });

    setFormData({ name: "", number: "" });
  };

  return (
    <Wrapper>
      <div className="container">
        <h2>Popular Transporters For Heavy Goods in Mumbai</h2>

        <div className="filters">
          {/* Vehicle Type Dropdown */}
          <div className="dropdown">
            <button onClick={() => toggleDropdown("vehicleType")}>
              Vehicle Type <AiFillCaretDown />
            </button>
            {dropdownVisible.vehicleType && (
              <div className="dropdown-content">
                {vehicles.map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      checked={selectedFilters.vehicleType.includes(type)}
                      onChange={() => handleFilterSelect("vehicleType", type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Load Type Dropdown */}
          <div className="dropdown">
            <button onClick={() => toggleDropdown("load")}>
              Load Type <AiFillCaretDown />
            </button>
            {dropdownVisible.load && (
              <div className="dropdown-content">
                {["Full Load", "Part Load"].map((load) => (
                  <label key={load}>
                    <input
                      type="radio"
                      name="load"
                      checked={selectedFilters.load === load}
                      onChange={() => handleFilterSelect("load", load)}
                    />
                    {load}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* States Dropdown */}
          <div className="dropdown">
            <button onClick={() => toggleDropdown("location")}>
              City <AiFillCaretDown />
            </button>
            {dropdownVisible.location && (
              <div className="dropdown-content">
                {location.map((city) => (
                  <label key={city}>
                    <input
                      type="radio"
                      name="location"
                      checked={selectedFilters.location === city}
                      onChange={() => handleFilterSelect("location", city)}
                    />
                    {city}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Ratings Dropdown */}
          <div className="dropdown">
            <button onClick={() => toggleDropdown("ratings")}>
              Ratings <AiFillCaretDown />
            </button>
            {dropdownVisible.ratings && (
              <div className="dropdown-content">
                {ratings.map((rating) => (
                  <label key={rating}>
                    <input
                      type="radio"
                      name="ratings"
                      checked={selectedFilters.ratings === rating.toString()}
                      onChange={() =>
                        handleFilterSelect("ratings", rating.toString())
                      }
                    />
                    {rating} ★
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Quick Response Filter */}
          <button
            onClick={() =>
              handleFilterSelect(
                "quickResponse",
                !selectedFilters.quickResponse
              )
            }
            className={selectedFilters.quickResponse ? "active" : ""}
          >
            Quick Response
          </button>

          {/* Popular Filter */}
          <button
            onClick={() =>
              handleFilterSelect("popular", !selectedFilters.popular)
            }
            className={selectedFilters.popular ? "active" : ""}
          >
            Popular
          </button>
        </div>
      </div>

      <div className="card-positionn">
        <div className="card-position-contentt">
          <h5>Get the List of Top</h5>
          <h5 className="co">"Transporters For Heavy Goods"</h5>
        </div>

        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-group">
                <input
                  type="text"
                  required
                  onChange={handleChange}
                  value={formData.name}
                  name="name"
                  className="name"
                  placeholder="Name*"
                ></input>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  required
                  onChange={handleChange}
                  value={formData.number}
                  name="number"
                  className="phone"
                  placeholder="Mobile Number*"
                ></input>
              </div>
            </div>
            <input
              type="submit"
              value="Get Best Price >>>"
              className="submit-button"
            ></input>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default FilterNav;

const Wrapper = styled.section`
  .container h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    margin-left: 20px;
  }

  .filters {
    display: flex;
    gap: 17px;
    margin-bottom: 20px;
    margin-left: 20px;
    flex-wrap: wrap;
  }

  .filters button {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: white;
    background: #e8e8e8;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 520;
    color: black;
  }

  .filters button.active {
    background-color: #0076d6;
    color: white;
  }

  .filters button:hover {
    background-color: #f0f0f0;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 10px;
    z-index: 1;
    margin-top: 5px;
    min-width: 150px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .dropdown-content label {
    display: block;
    padding: 5px 0;
    cursor: pointer;
  }

  .dropdown-content input {
    margin-right: 8px;
  }

  .card-positionn {
    display: flex;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
    width: 335px;
    height: 280px;
    margin-left: 20px;
    display: inline-block;
    position: fixed;
    right: 0;
    top: 330px;
  }

  .card-position-contentt {
    margin: 10px 17px;
    line-height: 25px;
  }

  .card-positionn .card-position-contentt h5 {
    color: black;
    font-size: 1.1rem;
  }

  .card-positionn .card-position-contentt .co {
    color: rgb(0, 118, 215);
    font-weight: 760;
    font-size: 1.2rem;
  }

  .form-group .name {
    width: 304px;
    height: 38px;
    border: 1.3px solid black;
    border-radius: 6px;
    padding: 0px 40px;
    margin: 10px 14px;
  }

  .form-group .phone {
    width: 304px;
    height: 38px;
    border: 1.3px solid black;
    border-radius: 6px;
    padding: 0px 40px;
    margin: 10px 14px;
  }

  .submit-button {
    width: 300px;
    height: 38px;
    border: 1.3px solid black;
    border-radius: 6px;
    padding: 0px 40px;
    margin: 10px 14px;
    color: white;
    background-color: rgb(0, 118, 215);
    font-size: 1.2rem;
    font-weight: 550;
  }

  @media (max-width: 768px) {
    .filters {
      gap: 10px;
    }

    .filters button {
      font-size: 1rem;
      padding: 6px 10px;
    }

    .card-positionn {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .filters {
      gap: 5px;
    }

    .filters button {
      font-size: 0.9rem;
      padding: 5px 8px;
    }

    .container h2 {
      font-size: 1.2rem;
      margin-left: 10px;
    }
  }
`;
