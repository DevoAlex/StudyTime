import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode'
import LoadingSpinner from '../components/LoadingSpinner'

function StudentUpdate() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [userID, setUserID] = useState('')
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const cookies = new Cookies()

  const getUserID = () => {
    const cookie = cookies.get('TOKEN')
    const decoded = jwt_decode(cookie)
    setUserID(decoded.studentId)
}

  const configuration = {
    method: "patch",
    url: `https://study-time-api.herokuapp.com/students/${userID}`,
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
    },
  };

  const getUserData = async() => {
    setIsLoading(true)
    try{
      await axios.get(`https://study-time-api.herokuapp.com/students/api/${userID}`)
      .then((res) => {
        setUserData({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          email: res.data.data.email
        })
      })
    } catch (err){
      console.log(err)
    } 
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

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
        });
        setConfirmPassword("");
        setError('')
        window.location.href = "/student-login";
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

  useEffect(() => {
    getUserID()
    getUserData()
  },[])

  return (
    <>
    {isLoading ? (
        <LoadingSpinner />
    ) : (
      <>
      <Helmet>
        <title>Edit profile - Study Time</title>
        <meta
          name="description"
          content="Edit your Study Time profile."
        />
      </Helmet>
      <Main>
        <SForm onSubmit={handleSubmit}>
          <h1>Edit Profile</h1>
          <h4>Edit the fields that you want to modify!</h4>
          <Slabel htmlFor="firstName">First name : </Slabel>
          <SInput
            type="text"
            id="firstName"
            name="firstName"
            value={signupData.firstName}
            placeholder={userData.firstName}
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
            placeholder={userData.lastName}
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
            placeholder={userData.email}
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
          <SButton variant="primary" type="submit" onClick={handleSubmit}>
            Edit
          </SButton>
        </SForm>
      </Main>
      </>
    )}
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
  margin-bottom: 2rem;
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

export default StudentUpdate;