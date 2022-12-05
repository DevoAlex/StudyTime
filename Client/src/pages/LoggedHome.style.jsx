import styled from "styled-components";
import { device } from "../components/device";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 35rem;
`;
export const Slink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  transition: transform 0.2s;
  :hover {
    transform: scale(1.13, 1.13);
  }
`;
export const Card = styled.div`
  display: flex;
  width: 18rem;
  min-height: 10rem;
  border-radius: 0.8rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgb(0, 0, 0, 0.4) 0px 15px 12px;
  @media ${device.tablet} {
    width: 30rem;
  }
  @media ${device.laptop} {
    width: 40rem;
  }
  @media ${device.laptopL} {
    width: 50rem;
  }
`;

export const UserImage = styled.img`
  height: 3rem;
  width: 3rem;
  margin-top: 1rem;
  position: relative;
  padding: 1rem;
  align-self: center;
  @media ${device.tablet} {
    width: 3.5rem;
    height: 3.5rem;
  }
  @media ${device.laptop} {
    width: 4.5rem;
    height: 4.5rem;
  }
  @media ${device.laptopL} {
    width: 5.5rem;
    height: 5.5rem;
  }
`;
export const RightInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media ${device.tablet} {
    margin-left: -3rem;
  }
  @media ${device.laptop} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    margin-left: -5rem;
  }
`;
export const SUnordList = styled.ul`
  min-width: 8rem;
  margin-top: -0.6rem;
  @media ${device.tablet} {
    margin-left: 4rem;
    margin-bottom: 1rem;
    li {
      margin-top: 0.2rem;
    }
  }
`;
export const Name = styled.h3`
  font-family: "Lora";
`;
export const LeftInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-left: 1rem;
    width: 6rem;
  }
  @media ${device.tablet} {
    margin-left: 1.5rem;
    p {
      margin-left: 1.5rem;
      margin-top: 0.3rem;
    }
  }
  @media ${device.laptop} {
    margin-left: 2.5rem;
    p {
      font-size: 1.1rem;
    }
  }
  @media ${device.laptopL} {
    margin-left: 7rem;
    p {
      font-size: 1.3rem;
      margin-left: 1rem;
    }
  }
`;
export const SSelect = styled.select`
  height: 2rem;
  width: 18rem;
  margin-top: 1.3rem;

  font-size: 0.9rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
  font-family: "Montserrat";
  @media ${device.laptopL} {
    width: 25rem;
    height: 2.5rem;
  }
`;
export const Slabel = styled.p`
  width: 18rem;
  margin-top: 1.5rem;
  margin-bottom: -1rem;
  font-family: "Comfortaa";
  @media ${device.laptopL} {
    font-size: 1.2rem;
    width: 25rem;
  }
`;
export const SButton = styled.button`
  border-radius: 0.3rem;
  margin-bottom: 0.7rem;
  margin-top: 0.7rem;
  height: 2rem;
  width: 16rem;
  align-self: center;
  border: none;
  background-color: #87cefa;
  font-family: "Comfortaa";
  cursor: pointer;
  transition: transform 0.2s;
  :hover {
    transform: scale(1.13, 1.13);
  }
  :active {
    background-color: #79b9e1;
  }
  @media ${device.laptopL} {
    width: 20rem;
    height: 2.2rem;
    font-size: 1.1rem;
  }
`;
