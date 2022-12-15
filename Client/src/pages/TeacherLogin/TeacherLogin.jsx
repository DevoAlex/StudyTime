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
} from "./TeacherLogin.style";
import { useLoginTeachers } from "../../hooks/useLoginTeachers";

function TeacherLogin() {
  const { handleSubmit, loginData, setLoginData, error, isLoading } =
    useLoginTeachers();

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
