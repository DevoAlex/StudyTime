import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, useParams } from "react-router-dom";
import TeacherManImg from "../images/man-icon.png";
import TeacherWomanImg from "../images/woman-icon.png";
import TeacherNotSetImg from "../images/teacher-not-set.png";

function Searched() {
  const [teacher, setTeacher] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let params = useParams();

  const getSearched = async (teacherID) => {
    setIsLoading(true);
    try {
      await axios
        .get(`https://study-time-api.herokuapp.com/teachers/api/${teacherID}`)
        .then((res) => {
          setTeacher(res.data.data);
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
        setIsLoading(false);
      }, 250);
  };

  useEffect(() => {
    getSearched(params.search);
    console.log(teacher);
  }, []);

  return (
    <>
    {isLoading ? (
        <LoadingSpinner />
    ) : (
        <Wrapper>
      {teacher.gender === "man" ? (
        <UserImage src={TeacherManImg} alt="Teacher man image" />
      ) : (
        ""
      )}
      {teacher.gender === "woman" ? (
        <UserImage src={TeacherWomanImg} alt="Teacher woman image" />
      ) : (
        ""
      )}
      {teacher.gender === "not set" ? (
        <UserImage src={TeacherNotSetImg} alt="Teacher not set image" />
      ) : (
        ""
      )}
      <Name>
        {teacher.firstName} {teacher.lastName}
      </Name>
      <City>🌍 {teacher.city}</City>
      <Description>{teacher.introduction}</Description>
      <Price>€ Price / Hour : {teacher.pricePerHour}</Price>
      <ListLabel>📚 Subjects :</ListLabel>
      <SUnordList>
        {teacher?.subjects?.map((item) => {
          return <SListItem key={item.value}>{item.label}</SListItem>;
        })}
      </SUnordList>
      <ListLabel>📎  Available for :</ListLabel>
      <SUnordList>
        {teacher?.availableFor?.map((item) => {
          return <SListItem key={item.value}>{item.label}</SListItem>;
        })}
      </SUnordList>
      <ListLabel>🗓  Available Days :</ListLabel>
      <SUnordList>
        {teacher?.availableDays?.map((item) => {
          return <SListItem key={item.value}>{item.label}</SListItem>;
        })}
      </SUnordList>
      <MailButton href={`mailto:${teacher.email}?subject=Help me from Study Time&body=Hi! I have seen your Study Time profile, I need help with my studies, can you help me? `}>Click to send mail</MailButton>
    </Wrapper>
    )}
    
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 35rem;
`;
const UserImage = styled.img`
  height: 6rem;
  width: 6rem;
  margin-top: 1.5rem;
  position: relative;
  padding: 1rem;
`;
const Name = styled.h1`
  font-family: "Lora";
  letter-spacing: 0.15rem;
`;
const City = styled.h4`
font-family: 'Comfortaa';
  margin-top: -0.1rem;
`;
const Description = styled.p`
  width: 16rem;
  letter-spacing: 0.05rem;
`;
const SUnordList = styled.ul`
    align-self: flex-start;
    margin-left: 2rem;
`
const SListItem = styled.li`
    padding: 0.3rem;
    ::marker{
        content: '📌';
    }
`
const ListLabel = styled.h4`
    font-family: 'Comfortaa';
    align-self: flex-start;
    margin-left: 2rem;
    margin-bottom: -0.5rem;
`
const Price = styled.p`
    align-self: flex-start;
    margin-left: 2rem;
`
const MailButton = styled.a`
margin-top: 1rem;
margin-bottom: 1rem;
    color: black;
    text-decoration: none;
    padding: 0.7rem;
    padding-left: 3rem;
    padding-right: 3rem;
    border-radius: 0.5rem;
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
`

export default Searched;
