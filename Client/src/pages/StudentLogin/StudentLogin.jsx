import React from "react";
import { Helmet } from "react-helmet";
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
import { useLoginStudents } from "../../hooks/useLoginStudents";

function StudentLogin() {
  const { handleSubmit, error, isLoading, loginData, setLoginData } =
    useLoginStudents();

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
