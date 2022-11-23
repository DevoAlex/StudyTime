import React from "react";
import styled from "styled-components";
import linkedinIcon from "../images/linkedin.png";
import instagramIcon from "../images/instagram.png";
import githubIcon from "../images/github.png";

function footer() {
  return (
    <Wrapper>
      <SocialWrapper>
        <a
          href="https://www.linkedin.com/in/alex-peluso-a42347227/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedinIcon} />
        </a>
        <a
          href="https://www.instagram.com/alex_peluso_/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagramIcon} />
        </a>
        <a href="https://github.com/DevoAlex/" target="_blank" rel="noreferrer">
          <img src={githubIcon} />
        </a>
      </SocialWrapper>
      <h5>Made by Alex Peluso &copy; 2022</h5>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #2d323e;
  gap: 1rem;
  text-align: center;
  margin-top: 1rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  color: white;
`;

const SocialWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  img {
    width: 2.3rem;
    height: 2.3rem;
    transition: transform 0.3s;
    :hover {
      transform: scale(1.2, 1.2);
    }
    :active {
      transform: scale(0.9, 0.9);
    }
  }
`;

export default footer;
