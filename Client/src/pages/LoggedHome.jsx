import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import TeacherManImg from "../images/man-icon.png";
import TeacherWomanImg from "../images/woman-icon.png";
import TeacherNotSetImg from "../images/teacher-not-set.png";

function LoggedHome() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState("DEFAULT");

  const fetchTeachers = async () => {
    try {
      await axios
        .get("https://study-time-api.herokuapp.com/teachers/api")
        .then((res) => {
          const data = res.data.data;
          setTeachers(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const teacherSubjectFilter = () => {
    const filterString = subjectFilter.toString();
    if (filterString !== "DEFAULT") {
      const filteredTeachers = teachers.filter((teacher) => {
        const prova = teacher.subjects;
        return prova.some((item) => item.value === filterString);
      });
      setTeachers(filteredTeachers);
    }
    return;
  };

  useEffect(() => {
    fetchTeachers();
  }, [subjectFilter]);

  useEffect(() => {
    setIsLoading(true);
    fetchTeachers();
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, []);

  return (
    <>
      {" "}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Wrapper>
          <Slabel>Subjects filter</Slabel>
          <SSelect
            value={subjectFilter}
            onChange={(e) => {
              setSubjectFilter(e.target.value);
            }}
          >
            <option value="DEFAULT">Select...</option>
            <option value="history">History</option>
            <option value="grammar">Grammar</option>
            <option value="mathematics">Mathematics</option>
            <option value="geography">Geography</option>
            <option value="art history">Art history</option>
            <option value="computer science">Computer Science</option>
            <option value="physical education">Physical Education</option>
            <option value="geometry">Geometry</option>
          </SSelect>
          <SButton onClick={teacherSubjectFilter}>Filter</SButton>
          {teachers.map((item) => {
            return (
              <Slink to={"/searched/" + item._id} key={item._id}>
                <Card key={item._id}>
                  <LeftInfoWrapper>
                    {item.gender === "man" ? (
                      <UserImage src={TeacherManImg} alt="Teacher man image" />
                    ) : (
                      ""
                    )}
                    {item.gender === "woman" ? (
                      <UserImage
                        src={TeacherWomanImg}
                        alt="Teacher woman image"
                      />
                    ) : (
                      ""
                    )}
                    {item.gender === "not set" ? (
                      <UserImage
                        src={TeacherNotSetImg}
                        alt="Teacher not set image"
                      />
                    ) : (
                      ""
                    )}
                    <p>📍{item.city}</p>
                  </LeftInfoWrapper>
                  <RightInfoWrapper>
                    <Name>
                      {item.firstName} {item.lastName}
                    </Name>
                    <SUnordList>
                      {item.subjects.map((item) => {
                        return <li key={item.value}>{item.label}</li>;
                      })}
                    </SUnordList>
                  </RightInfoWrapper>
                </Card>
              </Slink>
            );
          })}
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
const Slink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  transition: transform 0.2s;
  :hover {
    transform: scale(1.13, 1.13);
  }
`;
const Card = styled.div`
  display: flex;
  width: 18rem;
  min-height: 10rem;
  border-radius: 0.8rem;

  margin-top: 1rem;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgb(0, 0, 0, 0.4) 0px 15px 12px;
`;

const UserImage = styled.img`
  height: 3rem;
  width: 3rem;
  margin-top: 1rem;
  position: relative;
  padding: 1rem;
  align-self: center;
`;
const RightInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
`;
const SUnordList = styled.ul`
  min-width: 8rem;
  margin-top: -0.6rem;
`;
const Name = styled.h3`
  font-family: "Lora";
`;
const LeftInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-left: 1rem;
    width: 6rem;
  }
`;
const SSelect = styled.select`
  height: 2rem;
  width: 18rem;
  margin-top: 1.3rem;

  font-size: 0.9rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
  font-family: "Montserrat";
`;
const Slabel = styled.p`
  margin-top: 1rem;
  margin-bottom: -1rem;
  font-family: "Comfortaa";
`;
const SButton = styled.button`
  border-radius: 0.3rem;
  margin-bottom: 0.7rem;
  margin-top: 0.7rem;
  height: 2rem;
  width: 16rem;
  align-self: center;
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
`;

export default LoggedHome;