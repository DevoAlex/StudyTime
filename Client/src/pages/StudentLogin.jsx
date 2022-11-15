import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

function StudentLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const configuration = {
    method: "post",
    url: "https://study-time-api.herokuapp.com/students/login",
    data: {
      email: loginData.email,
      password: loginData.password,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios(configuration).then((res) => console.log(res));
      setLoginData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Student Login - Study Time</title>
        <meta
          name="description"
          content="Login to Study Time to find someone who helps you to prepare your next exam or do your homeworks. "
        />
      </Helmet>
      <Main>
        <Title>Student Login 🧑‍🎓</Title>
        <SForm>
          <Slabel htmlFor="email">Email : </Slabel>
          <SInput
            type="text"
            id="email"
            name="email"
            value={loginData.email}
            onChange={(e) => {
              setLoginData({
                ...loginData,
                email: e.target.value,
              });
            }}
          />
          <Slabel htmlFor="password">Password : </Slabel>
          <SInput
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={(e) => {
              setLoginData({
                ...loginData,
                password: e.target.value,
              });
            }}
          />
          {error ? <ErrorText>Incorrect email or password</ErrorText> : ""}
          <SButton variant="primary" type="submit" onClick={handleSubmit}>
            Login!
          </SButton>
          <SlinkText>
            You don't have an account yet?{" "}
            <SLink to="/student-signup">Get started!</SLink>
          </SlinkText>
        </SForm>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 33rem;
`;
const SForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 16rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  justify-content: center;
  h1 {
    padding-left: 3rem;
    width: 18rem;
    font-family: "Comfortaa";
  }
`;
const Title = styled.h1`
  font-family: "Comfortaa";
`;
const SInput = styled.input`
  font-size: 0.9rem;
  height: 1.5rem;
  margin-bottom: 1rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
`;
const Slabel = styled.label`
  margin-bottom: 0.3rem;
`;
const ErrorText = styled.p`
  font-family: "Comfortaa";
  color: red;
  font-size: 0.9rem;
`;
const SButton = styled.button`
  border-radius: 0.3rem;
  height: 2rem;
  width: 16rem;
  align-self: center;
  margin-top: 1rem;
  border: none;
  background-color: #87cefa;
  font-family: "Comfortaa";
  color: #5d5d5d;
  cursor: pointer;
  transition: transform 0.2s;
  :hover {
    transform: scale(1.13, 1.13);
  }
  :active {
    background-color: #79b9e1;
  }
`;
const SLink = styled(Link)`
  text-decoration: none;
  color: #79b9e1;
`;
const SlinkText = styled.p`
  width: 18rem;
  color: #5d5d5d;
  margin-top: 2rem;
`;

export default StudentLogin;
