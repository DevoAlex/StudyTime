import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../images/logo.png";
import settingsImage from "../images/settings.png";
import {
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineEdit,
  AiOutlineHome,
} from "react-icons/ai";
import Cookies from "universal-cookie";
import StudentImg from "../images/student.png";
import TeacherImg from "../images/teacher.png";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const cookies = new Cookies();

  const showUserSettings = () => {
    setIsOpen(!isOpen);
  };

  const isLogin = cookies.get("TOKEN");
  const user = cookies.get("USER");

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("USER", { path: "/" });
    window.location.href = "/";
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
          <SettingsImg src={settingsImage} onClick={showUserSettings} />
        </Link>
      </Navbar>
      {isOpen ? (
        <UserBar isOpen={isOpen} onClick={showUserSettings}>
          {user === "student" ? (
            <AvatarContainer>
              <Avatar src={StudentImg} />
            </AvatarContainer>
          ) : (
            ""
          )}
          {user === "teacher" ? (
            <AvatarContainer>
              <Avatar src={TeacherImg} />
            </AvatarContainer>
          ) : (
            ""
          )}

          <Slink to="#">
            <AiOutlineClose style={{ height: "1rem", width: "1rem" }} />
            <p>Close</p>
          </Slink>
          {isLogin ? (
            <Slink to="/home">
              <AiOutlineHome style={{ height: "1rem", width: "1rem" }} />
              <p>Home</p>
            </Slink>
          ) : (
            <Slink to="/">
              <AiOutlineHome style={{ height: "1rem", width: "1rem" }} />
              <p>Home</p>
            </Slink>
          )}
          {isLogin ? (
            <>
              {user === "student" ? (
                <Slink to="/student-edit">
                  <AiOutlineEdit style={{ height: "1rem", width: "1rem" }} />
                  <p>Edit profile</p>
                </Slink>
              ) : (
                <Slink to="/teacher-edit">
                  <AiOutlineEdit style={{ height: "1rem", width: "1rem" }} />
                  <p>Edit profile</p>
                </Slink>
              )}
              <LogoutBtn onClick={logout}>
                <AiOutlineLogout style={{ height: "1rem", width: "1rem" }} />
                <p>Logout</p>
              </LogoutBtn>
            </>
          ) : (
            ""
          )}
        </UserBar>
      ) : (
        ""
      )}
    </>
  );
}

const Navbar = styled.div`
  display: flex;
  width: 100%;
  background-color: #2d323e;
  height: 5rem;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
  font-family: "Federo", system-ui, -apple-system, "Segoe UI", "Open Sans",
    sans-serif;
  margin-left: 0.5rem;
`;
const Logo = styled.img`
  height: 2.2rem;
  margin-left: 1rem;
  margin-top: -0.8rem;
`;
const SettingsImg = styled.img`
  height: 2rem;
  width: 2rem;
  margin-top: 1rem;
  position: relative;
  margin-right: 1rem;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;
const Decoration = styled.div`
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
`;
const Slink = styled(Link)`
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
`;
const UserBar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0rem;
  right: 0rem;
  height: 100%;
  width: 10rem;
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
      width: 10rem;
    }
  }
`;

const LogoutBtn = styled.button`
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
`;

const AvatarContainer = styled.div`
  height: 4rem;
  text-align: center;
  width: 100%;
  padding-bottom: 1rem;
`;
const Avatar = styled.img`
  height: 3rem;
  width: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export default Nav;
