import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import styled from "styled-components";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiOutlineDelete } from "react-icons/ai";
import { MultiSelect } from "react-multi-select-component";

function TeacherUpdate() {
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
  const [teacherID, setTeacherID] = useState("");

  const cookies = new Cookies();

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

  const getTeacherID = () => {
    const cookie = cookies.get("TOKEN");
    const decoded = jwt_decode(cookie);
    setTeacherID(decoded.teacherId);
  };

  const editConfiguration = {
    method: "patch",
    url: `https://study-time-api.herokuapp.com/teachers/${teacherID}`,
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

  const getUserData = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`https://study-time-api.herokuapp.com/teachers/api/${teacherID}`)
        .then((res) => {
          setSignupData({
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            email: res.data.data.email,
            password: "",
            subjects: [],
            availableDays: [],
            pricePerHour: res.data.data.pricePerHour,
            city: res.data.data.city,
            gender: res.data.data.gender,
            introduction: res.data.data.introduction,
            availableFor: [],
          });
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password === confirmPassword) {
      try {
        await axios(editConfiguration).then((res) => console.log(res));
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
        cookies.remove("TOKEN", { path: "/" });
        cookies.remove("USER", { path: "/" });
        window.location.href = "/teacher-login";
      } catch (err) {
        console.log(err);
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

  const deleteConfig = {
    method: "delete",
    url: `https://study-time-api.herokuapp.com/teachers/${teacherID}`,
  };

  const handleDelete = async () => {
    await axios(deleteConfig).then((res) => console.log(res));
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("USER", { path: "/" });
    window.location.href = "/";
  };

  useEffect(() => {
    getTeacherID();
    getUserData();
  }, []);

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
                value={signupData?.firstName}
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
                value={signupData?.lastName}
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
                value={signupData?.email}
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

const Main = styled.main`
  display: flex;
  flex-direction: column;
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
    font-size: 2rem;
    width: 16rem;
    font-family: "Comfortaa";
  }
  h4 {
    width: 16rem;
    color: #5d5d5d;
    margin-top: 0.7rem;
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

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
`;
const EditButton = styled.button`
  border-radius: 0.3rem;
  height: 2rem;
  width: 16rem;
  align-self: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
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
const DeleteButton = styled.button`
  border-radius: 0.3rem;
  height: 2rem;
  width: 16rem;
  align-self: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border: none;
  background-color: #ee4b2b;
  font-family: "Comfortaa";
  cursor: pointer;
  transition: transform 0.2s;
  svg {
    height: 1rem;
    width: 1rem;
    margin-bottom: -0.2rem;
    margin-left: 0.3rem;
  }
  :hover {
    transform: scale(1.13, 1.13);
  }
  :active {
    background-color: #880808;
  }
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

export default TeacherUpdate;
