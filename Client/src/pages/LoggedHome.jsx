import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { MultiSelect } from "react-multi-select-component";
import { Link } from "react-router-dom";
import _ from 'lodash'
import TeacherManImg from '../images/man-icon.png'
import TeacherWomanImg from '../images/woman-icon.png'
import TeacherNotSetImg from '../images/teacher-not-set.png'

function LoggedHome() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState([])
  const [filteredTeachers, setFilteredTeachers] = useState([])

  const subjectSelectOptions = [
    { label: "History", value: "history" },
    { label: "Grammar", value: "grammar" },
    { label: "Mathematics", value: "mathematics" },
    { label: "Geography", value: "geography" },
    { label: "Art history", value: "art history" },
    { label: "Computer Science", value: "computer science" },
    { label: "Physical Education", value: "physical education" },
    { label: "Geometry", value: "geometry" },
  ];

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

  // ! Solution one
  // const testArray = []


  // const teacherSubjectValue = () => {
  //   teachers.map((teacher) => {
  //     const teachSubj = _.map(teacher.subjects, 'value')
  //     console.log(teachSubj)
  //     const selectedValues = _.map(subjectFilter, 'value')
  //     console.log(selectedValues)
  //     const intersSubject = _.intersection(teachSubj, selectedValues)
  //     console.log(intersSubject)
  //     if(_.isEqual(selectedValues, intersSubject)) {
  //       testArray.push(teacher)
  //       console.log(testArray)
  //     }
  //   })
  // }


  // ! solution 2

  const teacherSubjectValue = () => {
      teachers.map((teacher) => {
        const teachSubj = _.map(teacher.subjects, 'value')
        
        
        const intersSubject = _.includes(teachSubj, subjectFilter)
        if(intersSubject) {
          setFilteredTeachers(prevState => ([ ...prevState, teacher]))
          console.log(filteredTeachers)
        }
        
      })
    }


  useEffect(() => {
    fetchTeachers();
    //teacherSubjectValue()
  }, []);

  return (
    <>
      {" "}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
        <Slabel htmlFor="subjetcs">Subjects filter</Slabel>
        {/* <SMultiSelect
        
            name="subjects"
            options={subjectSelectOptions}
            value={subjectFilter}
            isCreatable={true}

            hasSelectAll={false}
            onChange={(e) => {
              setSubjectFilter(e)
              console.log(subjectFilter)
              } }
          /> */}
          <SSelect
            value={subjectFilter}
            onChange={(e) => {
              setSubjectFilter(e.target.value);
              setFilteredTeachers([])
              console.log(subjectFilter)
            }}
          >
            <option value="history">History</option>
            <option value="grammar">Grammar</option>
            <option value="mathematics">Mathematics</option>
            <option value="geography">Geography</option>
            <option value="art history">Art history</option>
            <option value="computer science">Computer Science</option>
            <option value="physical education">Physical Education</option>
            <option value="geometry">Geometry</option>
          </SSelect>

          <button onClick={teacherSubjectValue}>teacher</button>
          

          
          
          
          {teachers.map((item) => {
            
            return (
              <Card key={item._id}>
              <LeftInfoWrapper>
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
             <p>📍{item.city}</p>
             </LeftInfoWrapper>
             <RightInfoWrapper>
                <Name>{item.firstName} {item.lastName}</Name>
                <SUnordList>
                  {item.subjects.map((item) => {
                    return(
                      <li key={item.value}>{item.label}</li>
                    )
                  })}
                </SUnordList>
                </RightInfoWrapper>
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
  margin-top: 1rem;
  position: relative;
  padding: 1rem;
  align-self: center;
`
const RightInfoWrapper = styled.div`
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
const LeftInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  p{
    margin-left: 1rem;
    width: 6rem;
  }
`
const SSelect = styled.select`
  height: 2rem;
  width: 18rem;
  margin-left: 1rem;
  font-size: 0.9rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
  font-family: "Montserrat";
`;
const SMultiSelect = styled(MultiSelect)`
width: 18rem;
margin-left: 1rem;
margin-top: 1.5rem;
  font-size: 0.9rem;
  text-indent: 0.3rem;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;
const Slabel = styled.p`
margin-left: 1rem;
margin-top: 1rem;
margin-bottom: -1rem;
font-family: 'Comfortaa';
`;

export default LoggedHome;
