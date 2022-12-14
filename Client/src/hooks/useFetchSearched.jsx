import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {  useState } from "react";

export const useFetchSearched = () => {
  const [teacher, setTeacher] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [reviewForm, setReviewForm] = useState({
    student: "",
    teacher: "",
    rating: "",
    content: "",
  });
  const [isError, setIsError] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const user = cookies.get("USER");
  const navigate = useNavigate();
  let params = useParams();

  const reviewPostConfiguration = {
    method: "post",
    url: `${process.env.REACT_APP_FETCH_REVIEWS}`,
    data: {
      student: reviewForm.student,
      teacher: reviewForm.teacher,
      content: reviewForm.content,
      rating: reviewForm.rating,
    },
  };

  const getSearched = async (teacherID) => {
    if (token) {
      setIsLoading(true);
      try {
        await axios
          .get(`${process.env.REACT_APP_FETCH_TEACHERS}/${teacherID}`)
          .then((res) => {
            setTeacher(res.data.data);
          });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 350);
    } else {
      navigate("/", { replace: true });
    }
  };

  const fetchReviews = async (teacherID) => {
    if (token) {
      try {
        await axios
          .get(`${process.env.REACT_APP_FETCH_REVIEWS}${teacherID}`)
          .then((res) => {
            setReviews(res.data.data);
            setFetchError(false);
          });
      } catch (err) {
        console.log(err);
        setFetchError(err.response.data.error);
      }
    } else {
      throw new Error("Login needed to load reviews");
    }
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
            await axios(reviewPostConfiguration).then((res) => {
              console.log(res);
            });
            setIsError("");
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

  return {
    teacher,
    reviews,
    isLoading,
    fetchReviews,
    getSearched,
    fetchError,
    reviewPostConfiguration,
    reviewForm,
    setReviewForm,
    handleSubmit,
    isError
  };
};