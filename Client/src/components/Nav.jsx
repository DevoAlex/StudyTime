import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../images/logo.png";
import userImage from "../images/user.png";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const showUserSettings = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar>
        <Decoration>
          <div />
        </Decoration>
        <Container>
          <Logo src={LogoImage} />
          <Slink to="/">
            <Title>Study Time</Title>
          </Slink>
        </Container>
        <Link to="#">
          <UserImg src={userImage} onClick={showUserSettings} />
          {/* User settings here maybe? */}
        </Link>
      </Navbar>
      {/* {isOpen ? (
        <UserBar isOpen={isOpen} onClick={showUserSettings}>

        </UserBar>
    ) : (
        ''
    )} */}
    </>
  );
}

const Navbar = styled.div`
  display: flex;
  width: 100%;
  background-color: #2d323e;
  height: 4.7rem;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-size: 1.8rem;
  letter-spacing: 0.1rem;
  font-family: "Federo";
  margin-left: 1.5rem;
`;
const Logo = styled.img`
  height: 2.7rem;
  margin-left: 1rem;
  margin-top: -0.8rem;
`;
const UserImg = styled.img`
  height: 2.2rem;
  position: relative;
  margin-right: 1rem;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;
const Decoration = styled.div`
  width: 13.3rem;
  height: 0.3rem;
  background-color: #87CEFA;
  position: absolute;
  top: 0%;
  left: 1rem;
  div {
    background-color: red;
    width: 6.65rem;
    height: 0.3rem;
  }
`;
const Slink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: white;
  transition: transform 0.2s, margin-left 0.2s;
  :hover {
    transform: scale(1.13, 1.13);
    margin-left: 0.5rem;
  }
`;
// const UserBar = styled.div`

// `

export default Nav;
