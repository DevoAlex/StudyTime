import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Modal from "react-modal";
import {
  Container,
  LinkButton,
  HeroContainer,
  LinkContainer,
  CookieTitle,
  CookieButton,
  customModal,
} from "./Home.style";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const cookies = new Cookies();

  const isLogin = cookies.get("TOKEN");

  const cookieAccept = () => {
    let policy = localStorage.getItem("CookiePolicy");
    if (policy !== "Accepted") {
      setModalOpen(true);
    }
  };

  const modalAccept = () => {
    setModalOpen(false);
    localStorage.setItem("CookiePolicy", "Accepted");
  };

  useEffect(() => {
    cookieAccept();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Study Time</title>
        <meta name="keywords" content="study, exam, homeworks, test" />
        <meta
          name="description"
          content="Study Time helps you find someone who assists you to prepare your next exam or do your homeworks. "
        />
      </Helmet>
      <Modal isOpen={modalOpen} ariaHideApp={false} style={customModal}>
        <CookieTitle>Cookie consent</CookieTitle>
        <p>This site uses cookies for functionality purposes only</p>
        <CookieButton onClick={modalAccept}>
          <strong>Accept</strong>
        </CookieButton>
      </Modal>
      <HeroContainer>
        <h1>
          Find the help you need with your exam preparation or your homeworks
        </h1>
      </HeroContainer>
      <LinkContainer>
        {isLogin ? (
          <Link to="/home">
            <LinkButton>Student</LinkButton>
          </Link>
        ) : (
          <Link to="/student-login">
            <LinkButton>Student</LinkButton>
          </Link>
        )}
        {isLogin ? (
          <Link to="/home">
            <LinkButton>Teacher</LinkButton>
          </Link>
        ) : (
          <Link to="/teacher-login">
            <LinkButton>Teacher</LinkButton>
          </Link>
        )}
      </LinkContainer>
    </Container>
  );
}

export default Home;
