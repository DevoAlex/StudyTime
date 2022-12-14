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
  SInput,
  Slabel,
  ErrorText,
  EditButton,
  DeleteButton,
} from "./StudentEdit.style";

function StudentUpdate() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const navigate = useNavigate();

  const getUserID = () => {
    const cookie = cookies.get("TOKEN");
    const decoded = jwt_decode(cookie);
    setUserID(decoded.studentId);
  };

  const editConfiguration = {
    method: "patch",
    url: `${process.env.REACT_APP_MODIFY_STUDENTS}${userID}`,
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
    },
  };

  const getUserData = async () => {
    if (token) {
      setIsLoading(true);
      try {
        await axios
          .get(`${process.env.REACT_APP_FETCH_STUDENTS}${userID}`)
          .then((res) => {
            setSignupData({
              firstName: res.data.data.firstName,
              lastName: res.data.data.lastName,
              email: res.data.data.email,
              password: "",
            });
          });
      } catch (err) {
        console.log(err);
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
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
      } else if (signupData.firstName === "") {
        setError("First name field must be filled");
        throw new Error(`First name field must be filled`);
      } else if (signupData.lastName === "") {
        setError("Last name field must be filled");
        throw new Error(`Last name field must be filled`);
      } else if (signupData.email === "") {
        setError("Email field must be filled");
        throw new Error(`Email field must be filled`);
      } else {
        try {
          await axios(editConfiguration).then((res) => console.log(res));
          setSignupData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          setConfirmPassword("");
          setError("");
          cookies.remove("TOKEN", { path: "/" });
          cookies.remove("USER", { path: "/" });
          navigate("/student-login");
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
    url: `${process.env.REACT_APP_MODIFY_STUDENTS}${userID}`,
  };

  const handleDelete = async () => {
    await axios(deleteConfig).then((res) => console.log(res));
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("USER", { path: "/" });
    navigate("/", { replace: true });
  };

  useEffect(() => {
    getUserID();
  }, []);

  useEffect(() => {
    getUserData();
  }, [userID]);

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
              {/* <EditButton type="button" onClick={getUserData}>
                Pre-set your current datas
              </EditButton> */}
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
