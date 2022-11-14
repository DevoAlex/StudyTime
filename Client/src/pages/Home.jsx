import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Study Time</title>
        <meta name="keywords" content="study, exam, homeworks, test" />
        <meta
          name="description"
          content="Study Time helps you find someone who assists you to prepare your next exam or do your homeworks. "
        />
      </Helmet>
      <Nav />
      <h1>Home</h1>
      <p>Are you a student? <Link to='/student-login'>Login here</Link></p>
      <p>Are you a teacher? <Link to='/teacher-login'>Login here</Link></p>
    </div>
  );
}

export default Home;
