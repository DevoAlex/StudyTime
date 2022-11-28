import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { device } from "../components/device";

function TeacherLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const cookies = new Cookies();

  const configuration = {
    method: "post",
    url: "https://study-time.onrender.com/teachers/login",
    data: {
      email: loginData.email,
      password: loginData.password,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios(configuration).then((res) => {
        cookies.set("TOKEN", res.data.token, {
          path: "/",
        });

        cookies.set("USER", "teacher", {
          path: "/",
        });
        navigate("/home", {replace: true});
      });
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
        <title>Teacher Login - Study Time</title>
        <meta
          name="description"
          content="Get hired and help students prepare their next exam or do their homeworks. "
        />
      </Helmet>
      <Main>
        <Title>Teacher Login 🧑‍🏫</Title>
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
            <SLink to="/teacher-signup">Get started!</SLink>
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
  @media ${device.laptop} {
    min-height: 40rem;
  }
  @media ${device.laptopL} {
    min-height: 50rem;
  }
`;
const SForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 16rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  justify-content: center;
  h1 {
    text-align: center;
    width: 18rem;
    font-family: "Comfortaa";
  }
  @media ${device.laptop} {
    width: 25rem;
    h1 {
      width: 25rem;
    }
    h4 {
      width: 25rem;
      text-align: center;
    }
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
  @media ${device.laptop} {
    height: 2rem;
  }
`;
const Slabel = styled.label`
  margin-bottom: 0.3rem;
`;
const ErrorText = styled.p`
  font-family: "Comfortaa";
  color: red;
  font-size: 0.9rem;
  @media ${device.laptop} {
    font-size: 1.1rem;
  }
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
  @media ${device.laptop} {
    width: 22rem;
    font-size: 1.1rem;
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

export default TeacherLogin;
