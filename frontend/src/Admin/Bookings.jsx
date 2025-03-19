import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import AdminSideBar from "./AdminSideBar";
import Navbar from "../pages/Navbar";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const Bookings = () => {
  const { authUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); // Store selected booking details
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  //  Featch Booking Data
  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/get-bookings`,
        { headers: { Authorization: `${authUser?.token}` } }
      );
      if (response.status === 200) {
        setBookings(response.data?.bookings || []); // Ensure bookings is an array
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
      console.error(error);
    } finally {
      setIsLoading(false); // Ensure loading state is updated
    }
  };

  // Get Single Booking Data For Showing Model
  const getSingleBooking = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/single-booking/${id}`,
        { headers: { Authorization: `${authUser?.token}` } }
      );
      if (response.status === 200) {
        setSelectedBooking(response.data); // Set selected booking details
        setIsModalOpen(true); // Open modal
      }
    } catch (error) {
      toast.error("Failed to fetch booking details");
      console.error(error);
    }
  };

  // Update Booking Data
  const updateBookingStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/update-booking/${id}`,
        { status },
        { headers: { Authorization: `${authUser?.token}` } }
      );
      if (response.status === 200) {
        toast.success("Booking status updated successfully");
        fetchBookings(); // Refresh bookings after update
      }
    } catch (error) {
      toast.error("Failed to update booking status");
      console.error(error);
    }
  };

  // Delete Booking Data
  const deleteBooking = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this booking? This action cannot be undone."
    );
    if (!isConfirmed) return; // Exit if the admin cancels the action

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/delete-booking/${id}`,
        { headers: { Authorization: `${authUser?.token}` } }
      );
      if (response.status === 200) {
        toast.success("Booking deleted successfully");
        fetchBookings(bookings.filter((booking) => booking._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete booking");
      console.error(error);
    }
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <div className="main_container">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <AdminSideBar />
            </div>
            <div className="col-sm-8">
              <h1 className="text-center mt-4">Manage Bookings</h1>
              {isLoading ? (
                <Loading />
              ) : bookings?.length === 0 ? (
                <p className="text-center mt-5" style={{ height: "100vh" }}>
                  No bookings found
                </p>
              ) : (
                <TableContainer style={{ height: "100vh" }}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Transport</th>
                        <th>Pickup</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th colSpan={2} className="text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td title={booking.name}>
                            {truncateText(booking.name, 15)}
                          </td>
                          <td title={booking.Transport?.transportName}>
                            {truncateText(booking.Transport?.transportName, 15)}
                          </td>
                          <td title={booking.pickup}>
                            {truncateText(booking.pickup, 15)}
                          </td>
                          <td title={booking.destination}>
                            {truncateText(booking.destination, 15)}
                          </td>
                          <td>{new Date(booking.date).toLocaleDateString()}</td>

                          <td>
                            <StatusDropdown
                              value={booking.status}
                              onChange={(e) =>
                                updateBookingStatus(booking._id, e.target.value)
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                            </StatusDropdown>
                          </td>
                          <td style={{ display: "flex", gap: "8px" }}>
                            <ActionButton
                              onClick={() => getSingleBooking(booking._id)}
                            >
                              Show More
                            </ActionButton>
                          </td>
                          <td>
                            <DeleteButton
                              onClick={() => deleteBooking(booking._id)}
                            >
                              Delete
                            </DeleteButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for showing additional details */}
      {isModalOpen && selectedBooking && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <h2>Booking Details</h2>
              <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <DetailItem>
                <strong>Booking ID:</strong> {selectedBooking?.data?._id}
              </DetailItem>
              <DetailItem>
                <strong>Customer Name:</strong> {selectedBooking?.data?.name}
              </DetailItem>
              <DetailItem>
                <strong>Transport:</strong>{" "}
                {selectedBooking?.data?.Transport?.transportName}
              </DetailItem>
              <DetailItem>
                <strong>Pickup:</strong> {selectedBooking?.data?.pickup}
              </DetailItem>
              <DetailItem>
                <strong>Destination:</strong>{" "}
                {selectedBooking?.data?.destination}
              </DetailItem>
              <DetailItem>
                <strong>Date:</strong>{" "}
                {new Date(selectedBooking?.data?.date).toLocaleDateString()}
              </DetailItem>
              <DetailItem>
                <strong>Cost:</strong> ₹{selectedBooking?.data?.cost}
              </DetailItem>
              <DetailItem>
                <strong>Status:</strong> {selectedBooking?.data?.status}
              </DetailItem>
            </ModalBody>
          </Modal>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

export default Bookings;

// Styled Components
const Wrapper = styled.section`
  .main_container {
    height: 100%;
    background-color: #f8f9fa;
    padding: 20px;
  }

  h1 {
    color: #343a40;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    background-color: #f8f9fa;
    color: #343a40;
    font-weight: bold;
  }

  td {
    font-size: 0.9rem;
    color: #495057;
  }

  tr:hover {
    background-color: #f1f3f5;
  }
`;

const StatusDropdown = styled.select`
  padding: 8px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #495057;

  &:hover {
    cursor: pointer;
  }
`;
const ActionButton = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap; // Prevent text wrapping

  &:hover {
    background-color: #34c3eb;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  background-color: #e63946;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap; // Prevent text wrapping

  &:hover {
    background-color: #d62828;
  }
`;

const LoadingWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #495057;
  font-size: 1rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #495057;

  &:hover {
    color: #000;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailItem = styled.div`
  font-size: 0.9rem;
  color: #495057;
`;
