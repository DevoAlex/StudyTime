import styled from "styled-components";
import { device } from "../components/device";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 35rem;
  text-align: center;
`;
export const UserImage = styled.img`
  height: 6rem;
  width: 6rem;
  margin-top: 1.5rem;
  position: relative;
  padding: 1rem;
  @media ${device.tablet} {
    height: 8rem;
    width: 8rem;
  }
  @media ${device.laptopL} {
    height: 10rem;
    width: 10rem;
  }
`;
export const Name = styled.h1`
  font-family: "Lora";
  letter-spacing: 0.15rem;
  @media ${device.tablet} {
    font-size: 2rem;
  }
  @media ${device.laptopL} {
    font-size: 2.5rem;
  }
`;
export const City = styled.h4`
  font-family: "Comfortaa";
  margin-top: -0.1rem;
  @media ${device.tablet} {
    font-size: 1.3rem;
  }
  @media ${device.laptopL} {
    font-size: 1.5rem;
  }
`;
export const Description = styled.p`
  width: 16rem;
  letter-spacing: 0.05rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptop} {
    font-size: 1.3rem;
    width: 40rem;
  }
  @media ${device.laptopL} {
    font-size: 1.5rem;
    width: 50rem;
  }
`;
export const SUnordList = styled.ul`
  text-align: left;
  min-width: 14rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
export const SListItem = styled.li`
  margin-left: 2rem;
  padding: 0.3rem;
  ::marker {
    content: "📌";
  }
  @media ${device.tablet} {
    margin-left: 1rem;
  }
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    flex-direction: row;
    div {
      width: 14rem;
    }
  }
  @media ${device.laptopL} {
    div {
      width: 20rem;
    }
  }
`;
export const ListLabel = styled.h4`
  display: flex;
  margin-left: 1.5rem;
  font-family: "Comfortaa";
  min-width: 10rem;
  margin-bottom: -0.5rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
export const Subtitle = styled.h4`
  display: flex;
  font-family: "Comfortaa";
  min-width: 10rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
export const MailButton = styled.a`
  font-size: 0.85rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: black;
  text-decoration: none;
  padding: 0.5rem;
  padding-left: 5rem;
  padding-right: 5rem;
  border-radius: 0.3rem;
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
  @media ${device.tablet} {
    padding-left: 5rem;
    padding-right: 5rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  @media ${device.laptopL} {
    width: 22rem;
    margin-top: 5rem;
    margin-bottom: 5rem;
    align-self: center;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    font-size: 1.2rem;
  }
`;
export const SForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 16rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  justify-content: center;
  h4 {
    width: 16rem;
    color: #5d5d5d;
    margin-top: 1.2rem;
  }
  @media ${device.tablet} {
    width: 20rem;
  }
  @media ${device.laptopL} {
    width: 30rem;
  }
`;
export const SInput = styled.input`
  font-size: 0.9rem;
  height: 1.5rem;
  margin-bottom: 1rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  @media ${device.laptopL} {
    height: 2rem;
  }
`;
export const Slabel = styled.label`
  margin-bottom: 0.3rem;
  text-align: left;
  @media ${device.laptopL} {
    font-size: 1.3rem;
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
  @media ${device.laptopL} {
    height: 10rem;
  }
`;
export const SButton = styled.button`
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
  @media ${device.tablet} {
    width: 20rem;
    font-size: 1rem;
    margin-bottom: 3rem;
  }
  @media ${device.laptopL} {
    font-size: 1.2rem;
    width: 23rem;
    height: 2.5rem;
    margin-bottom: 5rem;
  }
`;
export const ReviewsLabel = styled.h4`
  display: flex;
  font-family: "Comfortaa";
  min-width: 10rem;
  margin-bottom: 2rem;
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
export const Avatar = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-left: 1rem;
  @media ${device.tablet} {
    height: 3.5rem;
    width: 3.5rem;
  }
  @media ${device.laptopL} {
    height: 4.5rem;
    width: 4.5rem;
  }
`;
export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  h4 {
    margin-left: 1rem;
    margin-bottom: 0.3rem;
  }
  p {
    font-size: 0.8rem;
    margin-top: -0.2rem;
    margin-left: 1rem;
  }
  @media ${device.laptopL} {
    h4 {
      font-size: 1.2rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
`;
export const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
  margin-bottom: 1.5rem;
  text-align: left;
  button {
    margin-left: 5rem;
    color: red;
    background-color: transparent;
    height: 2rem;
    width: 2rem;
    font-size: 1.5rem;
    border: none;
    margin-top: 1rem;
  }
  @media ${device.tablet} {
    width: 25rem;
  }
  @media ${device.laptop} {
    button {
      color: transparent;
    }
    :hover {
      button {
        color: red;
        cursor: pointer;
      }
    }
  }
  @media ${device.laptopL} {
    width: 35rem;
  }
`;
export const StarsWrapper = styled.div`
  display: flex;
  margin-left: 0.8rem;
  margin-top: -0.5rem;
  align-items: center;
  height: 1.5rem;
  gap: 0.1rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
export const ReviewContent = styled.p`
  margin-left: 0.8rem;
  margin-top: 0.8rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
