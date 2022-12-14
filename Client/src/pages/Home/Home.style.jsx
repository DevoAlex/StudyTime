import styled from "styled-components";
import { device } from "../../components/device";
import backgroundImage from "../../images/bg-image.jpg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${backgroundImage});
  background-size: cover;
  min-height: 30rem;
  background-position: center;
  margin-bottom: 2rem;
  @media ${device.laptop} {
    background-position: bottom;
    min-height: 40rem;
  }
  @media ${device.laptop} {
    background-position: bottom;
    min-height: 50rem;
  }
`;
export const LinkButton = styled.button`
  text-decoration: none;
  background-color: #79b9e1;
  color: #5d5d5d;
  font-family: "Comfortaa", system-ui, -apple-system, "Segoe UI", "Open Sans",
    sans-serif;
  width: 7rem;
  height: 2rem;
  border-radius: 0.3rem;
  border: none;
  transition: transform 0.2s;
  :hover {
    transform: scale(1.13, 1.13);
  }
  :active {
    background-color: #79b9e1;
  }
  @media ${device.tablet} {
    width: 9rem;
    height: 2.3rem;
    font-size: 1rem;
  }
  @media ${device.laptopL} {
    width: 10rem;
    height: 2.3rem;
    font-size: 1rem;
  }
`;
export const HeroContainer = styled.div`
  width: 16rem;
  font-family: "Federo", system-ui, -apple-system, "Segoe UI", "Open Sans",
    sans-serif;
  margin-top: 3rem;
  text-align: center;
  color: #5d5d5d;
  @media ${device.tablet} {
    margin-top: 2rem;
    width: 22rem;
    font-size: 1.2rem;
  }
  @media ${device.laptopL} {
    margin-top: 3rem;
    width: 30rem;
    font-size: 1.3rem;
  }
`;
export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  margin-left: 2rem;
  margin-right: 2rem;
  padding-bottom: 2rem;
  gap: 2rem;
  @media ${device.tablet} {
    gap: 10rem;
  }
  @media ${device.laptop} {
    margin-top: 6rem;
  }
  @media ${device.laptopL} {
    margin-top: 9rem;
  }
`;
export const CookieTitle = styled.h2`
  color: #79b9e1;
  font-family: "Lora";
  letter-spacing: 0.1rem;
  @media ${device.tablet} {
    font-size: 1.8rem;
  }
  @media ${device.laptopL} {
    font-size: 2.3rem;
  }
`;
export const CookieButton = styled.button`
  height: 2rem;
  width: 10rem;
  margin-top: 2rem;
  background-color: #79b9e1;
  color: white;
  border: none;
  border-radius: 1rem;
  transition: transform 0.2s;
  :hover {
    transform: scale(1.13, 1.13);
  }
  :active {
    background-color: #79b9e1;
  }
  @media ${device.tablet} {
    font-size: 1rem;
  }
  @media ${device.laptop} {
    font-size: 1.2rem;
    width: 12rem;
    height: 2.3rem;
  }
`;

export const customModal = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "15rem",
    top: "25%",
    backgroundColor: "#2d323e",
    color: "white",
    borderRadius: "0.5rem",
    textAlign: "center",
  },
};
