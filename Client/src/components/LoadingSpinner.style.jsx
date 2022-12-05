import styled from "styled-components";
import { device } from "./device";

export const Spinner = styled.div`
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
  border: 0.8rem double #2d323e;
  border-top: 0.8rem double #87cefa;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  @media ${device.tablet} {
    width: 6rem;
    height: 6rem;
    border: 1.5rem double #2d323e;
    border-top: 1.5rem double #87cefa;
  }
  @media ${device.laptopL} {
    width: 8rem;
    height: 8rem;
    border: 2rem double #2d323e;
    border-top: 2rem double #87cefa;
  }
  @media ${device.desktop} {
    width: 10rem;
    height: 10rem;
    border: 2.5rem double #2d323e;
    border-top: 2.5rem double #87cefa;
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65vh;
`;
