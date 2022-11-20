import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import backgroundImage from "../images/bg-image.jpg";

function Home() {
  const cookies = new Cookies();

  const isLogin = cookies.get("TOKEN");
  const user = cookies.get("USER");

  return (
    <Container>
      <Helmet>
        <title>Study Time</title>
        <meta name="keywords" content="study, exam, homeworks, test" />
        <meta
          name="description"
          content="Study Time helps you find someone who assists you to prepare your next exam or do your homeworks. "
        />
      </Helmet>
      <HeroContainer>
        <h1>
          Find the help you need with your exam preparation or your homeworks
        </h1>
      </HeroContainer>
      <LinkContainer>
        {isLogin && user === "student" ? (
          <Link to="/home">
            <LinkButton>Student</LinkButton>
          </Link>
        ) : (
          <Link to="/student-login">
            <LinkButton>Student</LinkButton>
          </Link>
        )}

        <Link to="/teacher-login">
          <LinkButton>Teacher</LinkButton>
        </Link>
      </LinkContainer>
    </Container>
  );
}

const Container = styled.div`
  background: url(${backgroundImage});
  background-size: cover;
  min-height: 30rem;
  background-position: center;
  margin-bottom: 2rem;
`;
const LinkButton = styled.button`
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
`;
const HeroContainer = styled.div`
  width: 16rem;
  font-family: "Federo", system-ui, -apple-system, "Segoe UI", "Open Sans",
    sans-serif;
  margin-left: 2rem;
  margin-top: 3rem;
  text-align: center;
  color: #5d5d5d;
`;
const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  margin-left: 2rem;
  margin-right: 2rem;
  padding-bottom: 2rem;
`;

export default Home;
