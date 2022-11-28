import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import styled from "styled-components";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import LoadingSpinner from "../components/LoadingSpinner";
import { device } from "../components/device";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const getUserID = () => {
    const cookie = cookies.get("TOKEN");
    const decoded = jwt_decode(cookie);
    setUserID(decoded.studentId);
  };

  const editConfiguration = {
    method: "patch",
    url: `https://study-time.onrender.com/students/${userID}`,
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
    },
  };

  const getUserData = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`https://study-time.onrender.com/students/api/${userID}`)
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
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  const handleSubmit = async (e) => {
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
  };

  const deleteConfig = {
    method: "delete",
    url: `https://study-time.onrender.com/students/${userID}`,
  };

  const handleDelete = async () => {
    await axios(deleteConfig).then((res) => console.log(res));
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("USER", { path: "/" });
    window.location.href = "/";
  };

  useEffect(() => {
    getUserID();
    getUserData();
    console.log(signupData);
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
    text-align: center;
    width: 16rem;
    font-family: "Comfortaa";
  }
  h4 {
    width: 16rem;
    color: #5d5d5d;
    margin-top: 0.7rem;
  }
  @media ${device.laptop} {
    width: 25rem;
    h1 {
      width: 25rem;
    }
    h4 {
      width: 25rem;
      text-align: center;
    }
  }
`;

const SInput = styled.input`
  font-size: 0.9rem;
  height: 1.5rem;
  margin-bottom: 1rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  @media ${device.laptop} {
    height: 2rem;
  }
`;
const Slabel = styled.label`
  margin-bottom: 0.3rem;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  @media ${device.laptop} {
    font-size: 1.1rem;
  }
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
  @media ${device.laptop} {
    width: 22rem;
    font-size: 1.1rem;
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
  @media ${device.laptop} {
    width: 22rem;
    font-size: 1.1rem;
  }
`;

export default StudentUpdate;
