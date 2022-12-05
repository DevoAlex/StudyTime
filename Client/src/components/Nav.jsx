import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import TeacherImg from "../images/teacher-icon.png";
import {
  Navbar,
  Title,
  Logo,
  SettingsImg,
  Container,
  Decoration,
  Slink,
  UserBar,
  LogoutBtn,
  AvatarContainer,
  Avatar,
} from "./Nav.style";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const cookies = new Cookies();

  const navigate = useNavigate();

  const showUserSettings = () => {
    setIsOpen(!isOpen);
  };

  const isLogin = cookies.get("TOKEN");
  const user = cookies.get("USER");

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("USER", { path: "/" });
    navigate("/");
  };

  return (
    <>
      <Navbar>
        <Decoration>
          <div />
        </Decoration>
        <Container>
          <Logo src={LogoImage} />
          {isLogin ? (
            <Slink to="/home">
              <Title>Study Time</Title>
            </Slink>
          ) : (
            <Slink to="/">
              <Title>Study Time</Title>
            </Slink>
          )}
        </Container>
        <Slink to="#">
          <SettingsImg src={settingsImage} onClick={showUserSettings} />
        </Slink>
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
              <div>
                <Avatar src={TeacherImg} />
              </div>
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

export default Nav;
