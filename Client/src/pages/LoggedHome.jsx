import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import TeacherManImg from '../images/teacher-man.png'
import TeacherWomanImg from '../images/teacher-woman.png'
import TeacherNotSetImg from '../images/teacher-not-set.png'
//import jwt_decode from "jwt-decode";

function LoggedHome() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();

  // const getUserData = () => {
  //   const cookie = cookies.get("TOKEN");
  //   const decoded = jwt_decode(cookie);
  //   console.log(decoded);
  // };

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      await axios
        .get("https://study-time-api.herokuapp.com/teachers/api")
        .then((res) => {
          const data = res.data.data;
          setTeachers(data);
        });
      console.log(teachers);
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  };

  useEffect(() => {
    fetchTeachers();
    //getUserData();
  }, []);

  return (
    <>
      {" "}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {teachers.map((item) => {
            return (
              <Card key={item._id}>
              {item.gender === 'man' ? ( 
              <UserImage 
                  src={TeacherManImg} alt='Teacher man image'
                />
             ) : ''}
              {item.gender === 'woman' ? ( 
              <UserImage 
                  src={TeacherWomanImg} alt='Teacher woman image'
                />
             ) : ''}
              {item.gender === 'not set' ? ( 
              <UserImage 
                  src={TeacherNotSetImg} alt='Teacher not set image'
                />
             ) : ''}
             <InfoWrapper>
                <Name>{item.firstName} {item.lastName}</Name>
                <SUnordList>
                  {item.subjects.map((item) => {
                    return(
                      <li key={item.value}>{item.label}</li>
                    )
                  })}
                </SUnordList>
                </InfoWrapper>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

const Card = styled.div`
  display: flex;
  width: 18rem;
  min-height: 10rem;
  border-radius: 0.8rem;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgb(0, 0, 0, 0.4) 0px 15px 12px;
`;

const UserImage = styled.img`
  height: 3rem;
  width: 3rem;
  position: relative;
  padding: 1rem;
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const SUnordList = styled.ul`
  margin-top: -0.6rem;
`
const Name = styled.h3`
  font-family: 'Montserrat';
`

export default LoggedHome;
