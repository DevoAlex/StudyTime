import React, { useState } from "react";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Main,
  SForm,
  SInput,
  Slabel,
  ErrorText,
  EditButton,
  DeleteButton,
} from "./StudentEdit.style";
import { useEditStudents } from "../../hooks/useEditStudents";

function StudentUpdate() {
  const {
    signupData,
    setSignupData,
    handleSubmit,
    handleDelete,
    isLoading,
    error,
    confirmPassword,
    setConfirmPassword
  } = useEditStudents();

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Helmet>
            <title>Account Edit - Study Time</title>
            <meta name="description" content="Edit your Study Time profile." />
          </Helmet>
          <Main>
            <SForm onSubmit={handleSubmit}>
              <h1>Account edit 📝</h1>
              <h4>Edit the fields that you want to modify!</h4>
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
              <EditButton type="submit" onClick={handleSubmit}>
                Edit
              </EditButton>
            </SForm>
            <DeleteButton onClick={handleDelete}>
              Delete <AiOutlineDelete />
            </DeleteButton>
          </Main>
        </>
      )}
    </>
  );
}

export default StudentUpdate;
