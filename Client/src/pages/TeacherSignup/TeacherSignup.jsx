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
  SSelect,
  STextArea,
  SMultiSelect,
} from "./TeacherSignup.style";

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
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();

  const navigate = useNavigate();

  const configuration = {
    method: "post",
    url: process.env.REACT_APP_SIGNUP_TEACHERS,
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
    setIsLoading(true);
    if (signupData.password === confirmPassword) {
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
}

export default TeacherSignup;
