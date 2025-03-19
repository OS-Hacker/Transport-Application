import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading"; // Import the Loading component
import styled from "styled-components";

const Booking = () => {
  const { authUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const showBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/customer-booking`,
        {
          headers: { Authorization: `${authUser?.token}` }, // Include token in request headers
        }
      );

      if (response.status === 200) {
        setBookings(response?.data || []); // Ensure bookings is an array
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    showBookings();
  }, []);

  return (
    <>
      <Navbar />
      <BookingContainer>
        <Title>Your Bookings</Title>
        {isLoading ? (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        ) : bookings?.length === 0 ? (
          <LoadingWrapper>
            <NoDataMessage>No bookings found.</NoDataMessage>
          </LoadingWrapper>
        ) : (
          <TableWrapper style={{height:"100vh"}}>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Booking ID</TableHeader>
                  <TableHeader>Customer Name</TableHeader>
                  <TableHeader>Transport Name</TableHeader>
                  <TableHeader>Pickup Location</TableHeader>
                  <TableHeader>Destination</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Cost</TableHeader>
                  <TableHeader>Status</TableHeader>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking?._id}>
                    <TableCell>{booking?._id}</TableCell>
                    <TableCell>{booking?.name}</TableCell>
                    <TableCell>{booking?.Transport?.transportName}</TableCell>
                    <TableCell>{booking?.pickup}</TableCell>
                    <TableCell>{booking?.destination}</TableCell>
                    <TableCell>
                      {new Date(booking?.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>₹{booking?.cost}</TableCell>
                    <TableCell>
                      <StatusBadge status={booking?.status}>
                        {booking?.status}
                      </StatusBadge>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </BookingContainer>
    </>
  );
};

export default Booking;

const BookingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
  color: #2d3748;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
`;

const TableHeader = styled.th`
  padding: 12px;
  border-bottom: 2px solid #e2e8f0;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #4a5568;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    white-space: nowrap;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${(props) =>
    props.status === "Pending"
      ? "#fefcbf"
      : props.status === "Confirmed"
      ? "#c6f6d5"
      : "#fed7d7"};
  color: ${(props) =>
    props.status === "Pending"
      ? "#975a16"
      : props.status === "Confirmed"
      ? "#276749"
      : "#742a2a"};
`;

const NoDataMessage = styled.p`
  font-size: 1rem;
  color: #718096;
  text-align: center;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;
