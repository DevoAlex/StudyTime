import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchHome = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [subjectFilter, setSubjectFilter] = useState("DEFAULT");
  
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
  
    const navigate = useNavigate();
  
    const fetchTeachers = async () => {
      if (token) {
        try {
          await axios.get(process.env.REACT_APP_FETCH_TEACHERS).then((res) => {
            const data = res.data.data;
            setTeachers(data);
            setFilteredTeachers(data);
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
        const filter = teachers.filter((teacher) => {
          const subj = teacher.subjects;
          return subj.some((item) => item.value === filterString);
        });
        setFilteredTeachers(filter);
      } else {
        setFilteredTeachers(teachers);
      }
    };
  
    useEffect(() => {
      teacherSubjectFilter();
    }, [subjectFilter]);
  
    useEffect(() => {
      setIsLoading(true);
      fetchTeachers();
      setTimeout(() => {
        setIsLoading(false);
      }, 350);
    }, []);
  
    return {
      fetchTeachers,
      isLoading,
      subjectFilter,
      setSubjectFilter,
      filteredTeachers,
    };
  };