import React from "react";
import searchIcon from "../../assets/Images/search-icon.png";
import truckImage from "../../assets/Images/truck.png";
import whiteNextIcon from "../../assets/Images/white-next.png";
import Navbar from "../../pages/Navbar";
import styled from "styled-components";

const Header = ({ image }) => {
  return (
    <Wrapper image={image}>
      <Navbar />
      <SliderSection>
        <div className="container">
          <SliderItemContainer>
            <div className="row">
              <div className="col-md-6">
                <SliderDetail>
                  <SearchForm>
                    <form action="">
                      <SearchInput>
                        <input type="text" placeholder="Search..." />
                        <img src={searchIcon} alt="Search Icon" />
                      </SearchInput>
                      <button type="submit">Search</button>
                    </form>
                  </SearchForm>
                  <Title>Unbeatable Trucking & Transport Services</Title>
                  <ButtonGroup>
                    <ReadButton href="/">
                      <span>Read More</span>
                      <img src={whiteNextIcon} alt="Next Icon" />
                    </ReadButton>
                    <QuoteButton href="/">
                      <span>Get A Quote</span>
                      <img src={whiteNextIcon} alt="Next Icon" />
                    </QuoteButton>
                  </ButtonGroup>
                </SliderDetail>
              </div>
              <div className="col-md-6">
                <TruckImage>
                  <img src={truckImage} alt="Truck" className="img-fluid" />
                </TruckImage>
              </div>
            </div>
          </SliderItemContainer>
        </div>
      </SliderSection>
    </Wrapper>
  );
};

export default Header;

// Styled Components
const Wrapper = styled.section`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SliderSection = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderItemContainer = styled.div`
  padding: 2rem;
`;

const SliderDetail = styled.div`
  max-width: 500px;
`;

const SearchForm = styled.div`
  margin-bottom: 2rem;

  form {
    display: flex;
    align-items: center;
  }

  button {
    background: #0a0057;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-left: 1rem;
    border-radius: 5px;
    transition: background 0.3s;

    &:hover {
      background: #78cffd;
    }
  }
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 0.5rem;
  border-radius: 5px;
  flex: 1;

  input {
    border: none;
    outline: none;
    flex: 1;
    margin-right: 0.5rem;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #0a0057;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ReadButton = styled.a`
  display: flex;
  align-items: center;
  background: #0a0057;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: #78cffd;
  }

  img {
    margin-left: 0.5rem;
    width: 16px;
    height: 16px;
  }
`;

const QuoteButton = styled(ReadButton)`
  background: #78cffd;

  &:hover {
    background: #0a0057;
  }
`;

const TruckImage = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`;
