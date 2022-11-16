
import React from "react";
import styled from "styled-components";
import { device } from "./device";

function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}

const Spinner = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  margin-top: 4rem;
  margin-bottom: 2rem;
  width: 3rem;
  height: 3rem;
  border: 0.8rem solid #13808633;
  border-top: 0.8rem solid #ffffff;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  @media ${device.tablet} {
    width: 6rem;
    height: 6rem;
    border: 1.5rem solid #13808633;
    border-top: 1.5rem solid #ffffff;
  }
  @media ${device.laptopL} {
    width: 8rem;
    height: 8rem;
    border: 2rem solid #13808633;
    border-top: 2rem solid #ffffff;
  }
  @media ${device.desktop} {
    width: 10rem;
    height: 10rem;
    border: 2.5rem solid #13808633;
    border-top: 2.5rem solid #ffffff;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoadingSpinner;