import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  Main,
  SForm,
  SInput,
  Slabel,
  ErrorText,
  SButton,
  SLink,
  SlinkText,
} from "./StudentSignup.style";

function StudentSignup() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();

  const navigate = useNavigate();

  const configuration = {
    method: "post",
    url: process.env.REACT_APP_SIGNUP_STUDENTS,
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (signupData.password === confirmPassword) {
      try {
        await axios(configuration).then((res) => {
          cookies.set("TOKEN", res.data.token, {
            path: "/",
          });

          cookies.set("USER", "student", {
            path: "/",
          });
          navigate("/home", { replace: true });
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
        setIsLoading(false);
        if (err.response.data.name === "ValidationError") {
          setError(err.response.data.message.split(": ").slice(2));
          console.log(error);
        }
      }
      setIsLoading(false);
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
}

export default StudentSignup;
