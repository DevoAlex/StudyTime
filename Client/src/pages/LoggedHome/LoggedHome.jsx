import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";
import TeacherManImg from "../../images/man-icon.png";
import TeacherWomanImg from "../../images/woman-icon.png";
import TeacherNotSetImg from "../../images/teacher-not-set.png";
import {
  Wrapper,
  Slink,
  Card,
  UserImage,
  RightInfoWrapper,
  SUnordList,
  Name,
  LeftInfoWrapper,
  SSelect,
  Slabel,
} from "./LoggedHome.style";
import { useFetchHome } from "../../hooks/useFetchHome.jsx";

function LoggedHome() {
  const {
    isLoading,
    subjectFilter,
    setSubjectFilter,
    filteredTeachers
  } = useFetchHome();

  return (
    <>
      <Helmet>
        <title>Home - Study Time</title>
        <meta name="keywords" content="study, exam, homeworks, test, home" />
        <meta
          name="description"
          content="Home - Study Time helps you find someone who assists you to prepare your next exam or do your homeworks. "
        />
      </Helmet>{" "}
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
          {filteredTeachers.map((item) => {
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
          })
          }
        </Wrapper>
      )}
    </>
  );
}

export default LoggedHome;
