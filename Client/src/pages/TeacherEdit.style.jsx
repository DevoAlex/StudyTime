import styled from "styled-components";
import { device } from "../components/device";
import { MultiSelect } from "react-multi-select-component";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const SForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 16rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  justify-content: center;
  h1 {
    font-size: 2rem;
    width: 16rem;
    font-family: "Comfortaa";
    text-align: center;
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

export const SInput = styled.input`
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
export const Slabel = styled.label`
  margin-bottom: 0.3rem;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  @media ${device.laptop} {
    font-size: 1.1rem;
  }
`;
export const EditButton = styled.button`
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
export const DeleteButton = styled.button`
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
export const SSelect = styled.select`
  height: 2rem;
  font-size: 0.9rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
  font-family: "Montserrat";
  @media ${device.laptop} {
    height: 2.5rem;
  }
`;
export const STextArea = styled.textarea`
  resize: none;
  height: 5rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-family: "Montserrat";
  @media ${device.laptop} {
    height: 9rem;
  }
`;
export const SMultiSelect = styled(MultiSelect)`
  font-size: 0.9rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
`;
