import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import {device} from '../components/device'
import TeacherManImg from "../images/man-icon.png";
import TeacherWomanImg from "../images/woman-icon.png";
import TeacherNotSetImg from "../images/teacher-not-set.png";
import StudentImg from "../images/student.png";

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
    console.log(decoded);
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
    setReviewForm({
      ...reviewForm,
      student: userID,
      teacher: teacher._id,
    });
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
          <ListLabel>📎 Available for :</ListLabel>
          <SUnordList>
            {teacher?.availableFor?.map((item) => {
              return <SListItem key={item.value}>{item.label}</SListItem>;
            })}
          </SUnordList>
          <ListLabel>🗓 Available Days :</ListLabel>
          <SUnordList>
            {teacher?.availableDays?.map((item) => {
              return <SListItem key={item.value}>{item.label}</SListItem>;
            })}
          </SUnordList>
          <SForm>
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
          <h4>Other students reviews</h4>
          {reviews?.map((review) => {
            console.log(review);
            let stars = [];
            for (let i = 0; i < review.rating; i++) {
              stars.push(<p key={i}>⭐️</p>);
            }
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
                </AvatarWrapper>

                <StarsWrapper>{stars}</StarsWrapper>

                <ReviewContent>{review.content}</ReviewContent>
              </ReviewWrapper>
            );
          })}
          <MailButton
            href={`mailto:${teacher.email}?subject=Help me from Study Time&body=Hi! I have seen your Study Time profile, I need help with my studies, can you help me? `}
          >
            Contact
          </MailButton>
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
  font-family: "Comfortaa";
  margin-top: -0.1rem;
`;
const Description = styled.p`
  width: 16rem;
  letter-spacing: 0.05rem;
`;
const SUnordList = styled.ul`
  align-self: flex-start;
  margin-left: 2rem;
`;
const SListItem = styled.li`
  padding: 0.3rem;
  ::marker {
    content: "📌";
  }
`;
const ListLabel = styled.h4`
  font-family: "Comfortaa";
  align-self: flex-start;
  margin-left: 2rem;
  margin-bottom: -0.5rem;
`;
const Price = styled.p`
  align-self: flex-start;
  margin-left: 2rem;
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
`;
const SInput = styled.input`
  font-size: 0.9rem;
  height: 1.5rem;
  margin-bottom: 1rem;
  text-indent: 0.3rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
`;
const Slabel = styled.label`
  margin-bottom: 0.3rem;
`;
const STextArea = styled.textarea`
  resize: none;
  height: 5rem;
  border-radius: 0.3rem;
  border: 0.1rem solid grey;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-family: "Montserrat";
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
`;
const ReviewsLabel = styled.h4`
  font-family: "Comfortaa";
  margin-bottom: 1rem;
  margin-left: -1rem;
`;
const Avatar = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-left: 1rem;
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
`;
const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
  margin-bottom: 1.5rem;
`;
const StarsWrapper = styled.div`
  display: flex;
  margin-left: 0.8rem;
  margin-top: -0.5rem;
  align-items: center;
  height: 1.5rem;
  gap: 0.1rem;
`;
const ReviewContent = styled.p`
  margin-left: 0.8rem;
  margin-top: 0.8rem;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export default Searched;
