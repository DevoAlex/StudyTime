import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";
import { device } from "../components/device";
import TeacherManImg from "../images/man-icon.png";
import TeacherWomanImg from "../images/woman-icon.png";
import TeacherNotSetImg from "../images/teacher-not-set.png";
import StudentImg from "../images/student.png";
import { AiOutlineDelete } from "react-icons/ai";

function Searched() {
  const [teacher, setTeacher] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState("");
  const [isError, setIsError] = useState("");
  const [reviewForm, setReviewForm] = useState({
    student: "",
    teacher: "",
    rating: "",
    content: "",
  });
  let params = useParams();
  const cookies = new Cookies();
  const user = cookies.get("USER");

  const getUserID = () => {
    const token = cookies.get("TOKEN");
    const decoded = jwt_decode(token);
    if (user === "student") {
      setUserID(decoded.studentId);
    }
  };

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

  const fetchReviews = async (teacherID) => {
    try {
      await axios
        .get(`https://study-time-api.herokuapp.com/reviews/api/${teacherID}`)
        .then((res) => {
          setReviews(res.data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const configuration = {
    method: "post",
    url: `https://study-time-api.herokuapp.com/reviews/api/`,
    data: {
      student: reviewForm.student,
      teacher: reviewForm.teacher,
      content: reviewForm.content,
      rating: reviewForm.rating,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user === "student") {
      try {
        if (Number(reviewForm.rating) <= 0) {
          setIsError("Rating value has to be from 1 to 5");
          throw new Error("Rating value has to be from 1 to 5");
        } else if (Number(reviewForm.rating) > 5) {
          setIsError("Rating value has to be from 1 to 5");
          throw new Error("Rating value has to be from 1 to 5");
        } else {
          await axios(configuration).then((res) => {
            console.log(res);
          });
          setReviewForm({
            content: "",
            rating: "",
          });
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsError("Only students can post reviews");
      throw new Error("Only students can post reviews");
    }
  };

  useEffect(() => {
    getSearched(params.search);
    fetchReviews(params.search);
    getUserID();
  }, []);

  return (
    <>
      <Helmet>
        <title>Teacher Page - Study Time</title>
        <meta
          name="keywords"
          content="teacher, professor, tutor, study, homeworks, study, exam"
        />
        <meta
          name="description"
          content="Find out what subjects i can teach you and when i'm available!"
        />
      </Helmet>
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
          <Subtitle>€ Price / Hour : {teacher.pricePerHour}</Subtitle>
          <InfoWrapper>
            <div>
              <ListLabel>📚 Subjects :</ListLabel>
              <SUnordList>
                {teacher?.subjects?.map((item) => {
                  return <SListItem key={item.value}>{item.label}</SListItem>;
                })}
              </SUnordList>
            </div>
            <div>
              <ListLabel>📎 Available for :</ListLabel>
              <SUnordList>
                {teacher?.availableFor?.map((item) => {
                  return <SListItem key={item.value}>{item.label}</SListItem>;
                })}
              </SUnordList>
            </div>
            <div>
              <ListLabel>🗓 Available Days :</ListLabel>
              <SUnordList>
                {teacher?.availableDays?.map((item) => {
                  return <SListItem key={item.value}>{item.label}</SListItem>;
                })}
              </SUnordList>
            </div>
          </InfoWrapper>
          <SForm>
            <MailButton
              href={`mailto:${teacher.email}?subject=Help me from Study Time&body=Hi! I have seen your Study Time profile. Can you help me with my studies? `}
            >
              Contact
            </MailButton>
            <ReviewsLabel>⭐️ Reviews</ReviewsLabel>
            <Slabel htmlFor="rating">Rating : </Slabel>
            <SInput
              placeholder="1 - 5"
              type="number"
              id="rating"
              name="rating"
              value={reviewForm.rating}
              onChange={(e) => {
                setReviewForm({
                  ...reviewForm,
                  student: userID,
                  teacher: teacher._id,
                  rating: e.target.value,
                });
              }}
            />
            <Slabel htmlFor="content">Add a text review : </Slabel>
            <STextArea
              placeholder="What do you like or do not like about this teacher?"
              value={reviewForm.content}
              onChange={(e) => {
                setReviewForm({
                  ...reviewForm,
                  content: e.target.value,
                });
              }}
            ></STextArea>
            {isError ? <ErrorText>{isError}</ErrorText> : ""}
            <SButton variant="primary" type="submit" onClick={handleSubmit}>
              Post review
            </SButton>
          </SForm>
          <Subtitle>Other students reviews</Subtitle>
          {reviews?.map((review) => {
            let stars = [];
            for (let i = 0; i < review.rating; i++) {
              stars.push(<p key={i}>⭐️</p>);
            }
            const deleteConfig = {
              method: "delete",
              url: `https://study-time-api.herokuapp.com/reviews/${review._id}`,
            };

            const handleDelete = async () => {
              await axios(deleteConfig).then((res) => console.log(res));
              window.location.reload();
            };
            return (
              <ReviewWrapper key={review._id}>
                <AvatarWrapper>
                  <Avatar src={StudentImg} alt="Student image" />
                  <div>
                    <h4>
                      {review.student.firstName} {review.student.lastName}
                    </h4>
                    <p>Reviewed on {review.createdAt.slice(0, 10)}</p>
                  </div>
                  {userID === review?.student._id ? (
                    <button onClick={handleDelete}>
                      <AiOutlineDelete />
                    </button>
                  ) : (
                    ""
                  )}
                </AvatarWrapper>
                <StarsWrapper>{stars}</StarsWrapper>
                <ReviewContent>{review.content}</ReviewContent>
              </ReviewWrapper>
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
  text-align: center;
`;
const UserImage = styled.img`
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
const Name = styled.h1`
  font-family: "Lora";
  letter-spacing: 0.15rem;
  @media ${device.tablet} {
    font-size: 2rem;
  }
  @media ${device.laptopL} {
    font-size: 2.5rem;
  }
`;
const City = styled.h4`
  font-family: "Comfortaa";
  margin-top: -0.1rem;
  @media ${device.tablet} {
    font-size: 1.3rem;
  }
  @media ${device.laptopL} {
    font-size: 1.5rem;
  }
`;
const Description = styled.p`
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
const SUnordList = styled.ul`
  text-align: left;
  min-width: 14rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
const SListItem = styled.li`
  margin-left: 2rem;
  padding: 0.3rem;
  ::marker {
    content: "📌";
  }
  @media ${device.tablet} {
    margin-left: 1rem;
  }
`;
const InfoWrapper = styled.div`
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
const ListLabel = styled.h4`
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
const Subtitle = styled.h4`
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
const MailButton = styled.a`
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
const SForm = styled.form`
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
const SInput = styled.input`
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
const Slabel = styled.label`
  margin-bottom: 0.3rem;
  text-align: left;
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
const STextArea = styled.textarea`
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
const SButton = styled.button`
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
const ReviewsLabel = styled.h4`
  display: flex;
  font-family: "Comfortaa";
  min-width: 10rem;
  margin-bottom: 2rem;
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;
const Avatar = styled.img`
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
const AvatarWrapper = styled.div`
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
const ReviewWrapper = styled.div`
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
const StarsWrapper = styled.div`
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
const ReviewContent = styled.p`
  margin-left: 0.8rem;
  margin-top: 0.8rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  @media ${device.tablet} {
    font-size: 1.1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`;

export default Searched;
