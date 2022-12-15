import React from "react";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Main,
  SForm,
  Slabel,
  SInput,
  ErrorText,
  EditButton,
  DeleteButton,
  SSelect,
  STextArea,
  SMultiSelect,
} from "./TeacherEdit.style";
import { useEditTeachers } from "../../hooks/useEditTeachers";

function TeacherUpdate() {
  const {
    signupData,
    setSignupData,
    handleSubmit,
    handleDelete,
    isLoading,
    error,
    confirmPassword,
    setConfirmPassword,
  } = useEditTeachers();

  const subjectSelectOptions = [
    { label: "History", value: "history" },
    { label: "Grammar", value: "grammar" },
    { label: "Mathematics", value: "mathematics" },
    { label: "Geography", value: "geography" },
    { label: "Art history", value: "art history" },
    { label: "Computer Science", value: "computer science" },
    { label: "Physical Education", value: "physical education" },
    { label: "Geometry", value: "geometry" },
  ];

  const daysSelectOptions = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ];

  const availableOptions = [
    { label: "Homework help", value: "homework help" },
    { label: "Study help", value: "study help" },
    { label: "Exam preparation", value: "exam preparation" },
  ];

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
              <Slabel htmlFor="subjects">Subjects : </Slabel>
              <SMultiSelect
                name="subjects"
                options={subjectSelectOptions}
                value={signupData.subjects}
                isCreatable={true}
                hasSelectAll={false}
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    subjects: e,
                  });
                }}
              />
              <Slabel htmlFor="availableDays">Available days : </Slabel>
              <SMultiSelect
                name="availableDays"
                options={daysSelectOptions}
                value={signupData.availableDays}
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    availableDays: e,
                  });
                }}
              />
              <Slabel htmlFor="pricePerHour">Price / hour : </Slabel>
              <SInput
                type="number"
                id="pricePerHour"
                name="pricePerHour"
                value={signupData.pricePerHour}
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    pricePerHour: e.target.value,
                  });
                }}
              />
              <Slabel htmlFor="city">City where you live : </Slabel>
              <SInput
                type="text"
                id="city"
                name="city"
                value={signupData.city}
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    city: e.target.value,
                  });
                }}
              />
              <Slabel htmlFor="gender">Gender :</Slabel>
              <SSelect
                value={signupData.gender}
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    gender: e.target.value,
                  });
                }}
              >
                <option value="not set">Not set</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
              </SSelect>
              <Slabel htmlFor="introduction">Introduction : </Slabel>
              <STextArea
                value={signupData.introduction}
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    introduction: e.target.value,
                  });
                }}
              ></STextArea>
              <Slabel htmlFor="availableFor">Available for : </Slabel>
              <SMultiSelect
                name="availableFor"
                disableSearch={true}
                options={availableOptions}
                value={signupData.availableFor}
                onChange={(e) => {
                  console.log(e);
                  setSignupData({
                    ...signupData,
                    availableFor: e,
                  });
                }}
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

export default TeacherUpdate;
