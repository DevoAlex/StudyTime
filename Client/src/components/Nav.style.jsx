import styled from "styled-components";
import { device } from "./device";
import { Link } from "react-router-dom";

export const Navbar = styled.div`
  display: flex;
  width: 100%;
  background-color: #2d323e;
  height: 5rem;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.h2`
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
  font-family: "Federo", system-ui, -apple-system, "Segoe UI", "Open Sans",
    sans-serif;
  margin-left: 0.5rem;
  @media ${device.laptop} {
    font-size: 1.6rem;
  }
`;
export const Logo = styled.img`
  height: 2.2rem;
  margin-left: 1rem;
  margin-top: -0.8rem;
`;
export const SettingsImg = styled.img`
  height: 2rem;
  width: 2rem;

  position: relative;
  margin-right: 1rem;
  cursor: pointer;
  @media ${device.laptop} {
    margin-right: 2rem;
    height: 2.1rem;
    width: 2.1rem;
  }
`;
export const Container = styled.div`
  display: flex;
  align-items: center;
`;
export const Decoration = styled.div`
  width: 10.3rem;
  height: 0.3rem;
  background-color: #87cefa;
  position: absolute;
  top: 0%;
  left: 1rem;
  div {
    background-color: red;
    width: 5.15rem;
    height: 0.3rem;
  }
  @media ${device.laptop} {
    width: 13rem;
    div {
      width: 6.5rem;
    }
  }
`;
export const Slink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  text-decoration: none;
  color: white;
  transition: transform 0.2s, margin-left 0.2s;
  :hover {
    transform: scale(1.13, 1.13);
    margin-left: 1.5rem;
  }
  @media ${device.laptop} {
    margin-left: 2rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
export const UserBar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0rem;
  right: 0rem;
  height: 100%;
  width: 10.5rem;
  z-index: 2;
  right: ${(props) => (props.isOpen ? "0" : "100%")};
  background-color: #2d323e;
  animation: showSideBar 0.3s;
  @keyframes showSideBar {
    from {
      opacity: 0;
      width: 0rem;
    }
    to {
      opacity: 1;
      width: 10.5rem;
    }
  }
  @media ${device.tablet} {
    width: 14rem;
    @keyframes showSideBar {
      from {
        opacity: 0;
        width: 0rem;
      }
      to {
        opacity: 1;
        width: 14rem;
      }
    }
  }
  @media ${device.laptopL} {
    width: 20rem;
    @keyframes showSideBar {
      from {
        opacity: 0;
        width: 0rem;
      }
      to {
        opacity: 1;
        width: 20rem;
      }
    }
  }
`;

export const LogoutBtn = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  color: white;
  cursor: pointer;
  gap: 0.5rem;
  font-size: 0.9rem;
  border: none;
  transition: transform 0.2s, margin-left 0.2s;
  :hover {
    transform: scale(1.13, 1.13);
    margin-left: 0.5rem;
  }
  @media ${device.laptop} {
    margin-left: 1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;

export const AvatarContainer = styled.div`
  height: 4rem;
  text-align: center;
  width: 100%;
  padding-bottom: 1rem;
  @media ${device.laptopL} {
    margin-top: 1rem;
    padding-bottom: 3rem;
  }
`;
export const Avatar = styled.img`
  height: 3rem;
  width: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  @media ${device.laptop} {
    height: 4rem;
    width: 4rem;
  }
  @media ${device.laptopL} {
    height: 5rem;
    width: 5rem;
  }
`;
