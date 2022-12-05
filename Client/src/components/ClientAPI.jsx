import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState("DEFAULT");

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const navigate = useNavigate();

  const fetchTeachers = async () => {
    if (token) {
      try {
        await axios
          .get("https://study-time.onrender.com/teachers/api")
          .then((res) => {
            const data = res.data.data;
            setTeachers(data);
          });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      navigate("/", { replace: true });
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
    }, 350);
  }, []);

  return {
    teacherSubjectFilter,
    fetchTeachers,
    isLoading,
    teachers,
    subjectFilter,
    setSubjectFilter,
  };
};

export const useFetchSearched = () => {
  const [teacher, setTeacher] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const navigate = useNavigate();

  const getSearched = async (teacherID) => {
    if (token) {
      setIsLoading(true);
      try {
        await axios
          .get(`https://study-time.onrender.com/teachers/api/${teacherID}`)
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
          .get(`https://study-time.onrender.com/reviews/api/${teacherID}`)
          .then((res) => {
            setReviews(res.data.data);
          });
      } catch (err) {
        console.log(err);
        setFetchError(err.response.data.error);
      }
    } else {
      throw new Error("Login needed to load reviews");
    }
  };

  return { teacher, reviews, isLoading, fetchReviews, getSearched, fetchError };
};
