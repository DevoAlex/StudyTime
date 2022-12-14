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
} from "./TeacherLogin.style";

function TeacherLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookies = new Cookies();

  const configuration = {
    method: "post",
    url: process.env.REACT_APP_LOGIN_TEACHERS,
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

        cookies.set("USER", "teacher", {
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
        <title>Teacher Login - Study Time</title>
        <meta
          name="description"
          content="Get hired and help students prepare their next exam or do their homeworks. "
        />
      </Helmet>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
}

export default TeacherLogin;
