import React, { useState } from "react";
import Carousel from "../components/Header/Carousel";
import Cart from "../components/Cart";
import styled from "styled-components";
import FilterNav from "../components/FilterNav";
import BookingModal from "../components/BookingModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransportId, setSelectedTransportId] = useState(null);

  const showModal = (transportId) => {
    setSelectedTransportId(transportId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    // Add logic for handling booking confirmation (e.g., API call)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Carousel />
      <FilterNav />
      <div className="cart_container">
        <Cart showModal={showModal} />
      </div>

      <BookingModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        selectedTransportId={selectedTransportId}
      />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section`
  .cart_container {
    padding: 30px;
  }
`;
