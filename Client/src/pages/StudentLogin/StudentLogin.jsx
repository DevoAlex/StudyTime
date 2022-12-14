import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  Main,
  SForm,
  Title,
  SInput,
  Slabel,
  ErrorText,
  SButton,
  SLink,
  SlinkText,
} from "./StudentLogin.style";

function StudentLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();

  const navigate = useNavigate();

  const configuration = {
    method: "post",
    url: process.env.REACT_APP_LOGIN_STUDENTS,
    data: {
      email: loginData.email,
      password: loginData.password,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      setLoginData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      setError(true);
      setIsLoading(false);
    }
    setIsLoading(false);
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
}

export default StudentLogin;
