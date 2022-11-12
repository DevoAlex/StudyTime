import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function StudentSignup() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const configuration = {
    method: "POST",
    url: 'https://study-time-api.herokuapp.com/students/signup',
    data: {signupData}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(signupData);
      await axios(configuration)
      .then((res)=> {console.log(res)})
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <SForm onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name : </label>
        <input
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
        <label htmlFor="lastName">Last name : </label>
        <input
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
        <label htmlFor="email">Email : </label>
        <input
          type="text"
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
        <label htmlFor="password">Password : </label>
        <input
          type="text"
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
        <button variant="primary" type="submit" onClick={handleSubmit}>
          Signup
        </button>
      </SForm>
    </main>
  );
}

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 12rem;
  margin-left: 2rem;
  margin-top: 1rem;
`;

export default StudentSignup;
