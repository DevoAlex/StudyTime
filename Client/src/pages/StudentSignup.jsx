import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { device } from "../components/device";

function StudentSignup() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const cookies = new Cookies();

  const configuration = {
    method: "post",
    url: "https://study-time-api.herokuapp.com/students/signup",
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password === confirmPassword) {
      try {
        await axios(configuration).then((res) => {
          cookies.set("TOKEN", res.data.token, {
            path: "/",
          });

          cookies.set("USER", "student", {
            path: "/",
          });
          window.location.href = "/home";
        });
        setSignupData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setConfirmPassword("");
        setError("");
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data.name === "ValidationError") {
          setError(err.response.data.message.split(": ").slice(2));
          console.log(error);
        }
      }
    } else {
      setError("Passwords does not match");
      throw new Error(`Passwords does not match`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Student Signup - Study Time</title>
        <meta
          name="description"
          content="Register to Study Time to find someone who helps you to prepare your next exam or do your homeworks. "
        />
      </Helmet>
      <Main>
        <SForm onSubmit={handleSubmit}>
          <h1>Let's get started 👋</h1>
          <h4>Join our platform and find the teacher that can help you!</h4>
          <Slabel htmlFor="firstName">First name : </Slabel>
          <SInput
            type="text"
            id="firstName"
            name="firstName"
            value={signupData.firstName}
            onChange={(e) => {
              setSignupData({
                ...signupData,
                firstName: e.target.value,
              });
            }}
          />
          <Slabel htmlFor="lastName">Last name : </Slabel>
          <SInput
            type="text"
            id="lastName"
            name="lastName"
            value={signupData.lastName}
            onChange={(e) => {
              setSignupData({
                ...signupData,
                lastName: e.target.value,
              });
            }}
          />
          <Slabel htmlFor="email">Email : </Slabel>
          <SInput
            type="email"
            id="email"
            name="email"
            value={signupData.email}
            onChange={(e) => {
              setSignupData({
                ...signupData,
                email: e.target.value,
              });
            }}
          />
          <Slabel htmlFor="password">Password : </Slabel>
          <SInput
            type="password"
            id="password"
            name="password"
            value={signupData.password}
            onChange={(e) => {
              setSignupData({
                ...signupData,
                password: e.target.value,
              });
            }}
          />
          <Slabel htmlFor="confirmPassword"> Confirm password : </Slabel>
          <SInput
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error ? <ErrorText>{error}</ErrorText> : ""}
          <SButton variant="primary" type="submit" onClick={handleSubmit}>
            Start now!
          </SButton>
          <SlinkText>
            Already registered? <SLink to="/student-login">Login</SLink>
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
    font-size: 2rem;
    width: 13rem;
    font-family: "Comfortaa";
    text-align: center;
  }
  h4 {
    width: 16rem;
    color: #5d5d5d;
    margin-top: 1.2rem;
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

export default StudentSignup;
