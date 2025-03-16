import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AdminSideBar = () => {
  return (
    <Wrapper>
      <SidebarContainer>
        <h1 className="sidebar_title">Admin Panel</h1>
        <NavLink
          to="/dashboard/admin/create-transport"
          className="sidebar_link"
          activeClassName="active"
        >
          Create Transport
        </NavLink>
        <NavLink
          to="/dashboard/admin/show-transport"
          className="sidebar_link"
          activeClassName="active"
        >
          Show Transport
        </NavLink>
        <NavLink
          to="/dashboard/admin/bookings"
          className="sidebar_link"
          activeClassName="active"
        >
          Bookings
        </NavLink>
      </SidebarContainer>
    </Wrapper>
  );
};

export default AdminSideBar;

// Styled Components
const Wrapper = styled.section`
  height: 100%;
`;

const SidebarContainer = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;

  .sidebar_title {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .sidebar_link {
    display: block;
    padding: 0.75rem 1rem;
    margin: 0.5rem 0;
    font-size: 1.2rem;
    color: #333;
    text-decoration: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    background-color: #fff;
    border: 1px solid #ddd;

    &:hover {
      background-color: #56cded;
      color: white;
      border-color: #34c3eb;
    }

    &.active {
      background-color: #34c3eb;
      color: white;
      border-color: #34c3eb;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .sidebar_title {
      font-size: 1.5rem;
    }

    .sidebar_link {
      font-size: 1rem;
      padding: 0.5rem 0.75rem;
    }
  }
`;
