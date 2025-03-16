import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"; // Import styled-components

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7fafc;
  padding: 16px;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const ContentWrapper = styled.div`
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 8px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #e53e3e;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const HomeLink = styled(Link)`
  display: inline-block;
  background-color: #3182ce;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6ab59d;
    color: #fff;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.875rem;
  }
`;

const ErrorPage = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>Oops!</Title>
        <Subtitle>Something went wrong.</Subtitle>
        <HomeLink to="/">Go Back Home</HomeLink>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ErrorPage;
