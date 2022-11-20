import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MultiSelect } from "react-multi-select-component";

function TeacherSignup() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    subjects: [],
    availableDays: [],
    pricePerHour: "",
    city: "",
    gender: "not set",
    introduction: "",
    availableFor: [],
  });
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const configuration = {
    method: "post",
    url: "https://study-time-api.herokuapp.com/teachers/signup",
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
      subjects: signupData.subjects,
      availableDays: signupData.availableDays,
      pricePerHour: signupData.pricePerHour,
      city: signupData.city,
      gender: signupData.gender,
      introduction: signupData.introduction,
      availableFor: signupData.availableFor,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password === confirmPassword) {
      try {
        await axios(configuration).then((res) => console.log(res));
        setSignupData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          subjects: [],
          availableDays: [],
          pricePerHour: "",
          city: "",
          gender: "not set",
          introduction: "",
          availableFor: [],
        });
        setConfirmPassword("");
        setError("");
        window.location.href = "/teacher-login";
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data.name === "ValidationError") {
          setError(err.response.data.message.split(": ").slice(2));
          console.log(error);
        }
      }
    } else {
      setError("Passwords doesn't match");
      throw new Error(`Passwords doesn't match`);
    }
  };

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
      <Helmet>
        <title>Teacher Signup - Study Time</title>
        <meta
          name="description"
          content="Register to Study Time and get hired by someone who needs you to prepare their next exam or do their homeworks. "
        />
      </Helmet>
      <Main>
        <SForm onSubmit={handleSubmit}>
          <h1>Let's get started 👋</h1>
          <h4>
            Join our platform and help students prepare for exams or do their
            homeworks!
          </h4>
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
          <Slabel htmlFor="gender">
            Gender <br /> (used to set up avatar) :{" "}
          </Slabel>
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
          <SButton variant="primary" type="submit" onClick={handleSubmit}>
            Start now!
          </SButton>
          <SlinkText>
            Already registered? <SLink to="/teacher-login">Login</SLink>
          </SlinkText>
        </SForm>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
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
    width: 13rem;
    font-family: "Comfortaa";
  }
  h4 {
    width: 16rem;
    color: #5d5d5d;
    margin-top: 1.2rem;
  }
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
const Checboxcontainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  label {
    width: 14rem;
  }
`;

const ErrorText = styled.p`
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
const SSelect = styled.select`
  height: 2rem;
  font-size: 0.9rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
  font-family: "Montserrat";
`;
const STextArea = styled.textarea`
  resize: none;
  height: 5rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-family: "Montserrat";
`;
const SMultiSelect = styled(MultiSelect)`
  font-size: 0.9rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
`;

export default TeacherSignup;
