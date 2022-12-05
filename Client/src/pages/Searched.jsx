import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";
import TeacherManImg from "../images/man-icon.png";
import TeacherWomanImg from "../images/woman-icon.png";
import TeacherNotSetImg from "../images/teacher-not-set.png";
import StudentImg from "../images/student.png";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Wrapper,
  UserImage,
  Name,
  City,
  Description,
  SUnordList,
  SListItem,
  InfoWrapper,
  ListLabel,
  Subtitle,
  MailButton,
  SForm,
  SInput,
  Slabel,
  STextArea,
  SButton,
  ReviewsLabel,
  Avatar,
  AvatarWrapper,
  ReviewWrapper,
  StarsWrapper,
  ReviewContent,
  ErrorText,
} from "./Searched.style";
import { useFetchSearched } from "../components/ClientAPI";

function Searched() {
  const { teacher, reviews, isLoading, fetchReviews, getSearched, fetchError } =
    useFetchSearched();

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
  const token = cookies.get("TOKEN");

  const navigate = useNavigate();

  const getUserID = () => {
    const token = cookies.get("TOKEN");
    const decoded = jwt_decode(token);
    if (user === "student") {
      setUserID(decoded.studentId);
    }
  };

  const configuration = {
    method: "post",
    url: `https://study-time.onrender.com/reviews/api/`,
    data: {
      student: reviewForm.student,
      teacher: reviewForm.teacher,
      content: reviewForm.content,
      rating: reviewForm.rating,
    },
  };

  const handleSubmit = async (e) => {
    if (token) {
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
            fetchReviews(params.search);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setIsError("Only students can post reviews");
        throw new Error("Only students can post reviews");
      }
    } else {
      navigate("/", { replace: true });
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
          {fetchError ? (
            <p>{fetchError}</p>
          ) : (
            reviews.map((review) => {
              let stars = [];
              for (let i = 0; i < review.rating; i++) {
                stars.push(<p key={i}>⭐️</p>);
              }
              const deleteConfig = {
                method: "delete",
                url: `https://study-time.onrender.com/reviews/${review._id}`,
              };

              const handleDelete = async () => {
                try {
                  await axios(deleteConfig).then((res) => console.log(res));
                  fetchReviews(params.search);
                } catch (err) {
                  console.log(err);
                }
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
            })
          )}
        </Wrapper>
      )}
    </>
  );
}

export default Searched;
