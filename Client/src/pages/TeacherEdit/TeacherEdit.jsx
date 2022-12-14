import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
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
  const token = cookies.get("TOKEN");

  const navigate = useNavigate();

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
    url: `${process.env.REACT_APP_MODIFY_TEACHERS}${teacherID}`,
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
    if (token) {
      setIsLoading(true);
      try {
        await axios
          .get(`${process.env.REACT_APP_FETCH_TEACHERS}/${teacherID}`)
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
        setIsLoading(false);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    if (token) {
      e.preventDefault();
      if (
        signupData.password !== confirmPassword ||
        signupData.password.length <= 7
      ) {
        setError(
          "Passwords doesn't match and Password must be minimum 8 characters and must contain one uppercase letter, one number and one symbol"
        );
        throw new Error(
          `Passwords doesn't match and Password must be minimum 8 characters and must contain one uppercase letter, one number and one symbol`
        );
      } else if (signupData.availableDays.length === 0) {
        setError("Available days field must be filled");
        throw new Error(`Available days field must be filled`);
      } else if (signupData.subjects.length === 0) {
        setError("Subjects field must be filled");
        throw new Error(`Subjects field must be filled`);
      } else if (signupData.availableFor.length === 0) {
        setError("Available for field must be filled");
        throw new Error(`Available for field must be filled`);
      } else {
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
          navigate("/teacher-login");
        } catch (err) {
          console.log(err);
          if (err.response.data.name === "ValidationError") {
            setError(err.response.data.message.split(": ").slice(2));
            console.log(error);
          }
        }
      }
    } else {
      navigate("/", { replace: true });
    }
  };

  const deleteConfig = {
    method: "delete",
    url: `${process.env.REACT_APP_MODIFY_TEACHERS}${teacherID}`,
  };

  const handleDelete = async () => {
    if (token) {
      await axios(deleteConfig).then((res) => console.log(res));
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("USER", { path: "/" });
      navigate("/", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    getTeacherID();
    getUserData();
    console.log(signupData.subjects);
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
              <EditButton type="button" onClick={getUserData}>
                Pre-set your current datas
              </EditButton>
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

export default TeacherUpdate;
