import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import AdminSideBar from "./AdminSideBar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../pages/Navbar";
import Loading from "../components/Loading";

const AdminDeshbored = () => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false); // For fetching data
  const [transports, setTransports] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // Track which transport is being deleted

  // Fetch Transport Data
  const fetchTransportData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/get-transport`,
        {
          headers: {
            Authorization: `${authUser?.token}`,
          },
        }
      );
      setTransports(data?.transports || []);
    } catch (err) {
      console.error("Error fetching transports:", err);
      setError("Failed to fetch transports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransportData();
  }, []);

  // Delete transport
  const handleDeleteTransport = async (id) => {
    setDeletingId(id); // Set the ID of the transport being deleted
    if (window.confirm("Are you sure you want to delete this transport?")) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/delete-transport/${id}`,
          {
            headers: {
              Authorization: `${authUser?.token}`,
            },
          }
        );

        if (data.success) {
          toast.success(data.msg);
          fetchTransportData(); // Refresh the transport list
        }
      } catch (error) {
        console.error("Error deleting transport:", error);
        toast.error("Failed to delete transport");
      } finally {
        setDeletingId(null); // Reset the deleting ID
      }
    } else {
      setDeletingId(null); // Reset the deleting ID if user cancels
    }
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Wrapper>
      <Navbar />
      <div className="main_container">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <AdminSideBar />
            </div>
            <div className="col-sm-8 text-center text-dark mb-5 main">
              <h2>Transport Data</h2>
              {loading ? (
                <Loading />
              ) : transports.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Vehicle Type</th>
                        <th>Location</th>
                        <th colSpan={2} className="text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transports.map((transport) => (
                        <tr key={transport?._id}>
                          <td>
                            <img
                              src={transport?.transportImage}
                              alt={transport?.transportName}
                              className="transport-image"
                            />
                          </td>
                          <td>{truncateText(transport?.transportName, 20)}</td>
                          <td>
                            {truncateText(transport?.transportNumber, 15)}
                          </td>
                          <td>{truncateText(transport?.vehicleType, 15)}</td>
                          <td>{truncateText(transport?.location, 20)}</td>
                          <td className="">
                            <Link
                              to={`/dashboard/admin/update-transport/${transport._id}`}
                              className="btn btn-primary btn-sm me-2"
                            >
                              Edit
                            </Link>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                handleDeleteTransport(transport._id)
                              }
                              className="btn btn-danger btn-sm"
                              disabled={deletingId === transport._id} // Disable button while deleting
                            >
                              {deletingId === transport._id ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                ></div>
                              ) : (
                                "Delete"
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No transport data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDeshbored;

// Styled Components
const Wrapper = styled.section`
  .main_container {
    height: 100%;
    background-color: #f8f9fa;
    padding: 20px;
  }

  .table-responsive {
    overflow-x: auto;
  }

  @media (max-width: 768px) {
    .main {
      margin-top: 20px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  .transport-image {
    width: 100px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
