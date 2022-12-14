import React from "react";
import { Wrapper, SocialWrapper } from "./Footer.style";
import linkedinIcon from "../../images/linkedin.png";
import instagramIcon from "../../images/instagram.png";
import githubIcon from "../../images/github.png";

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

export default footer;
