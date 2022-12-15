import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const useEditTeachers = () => {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    subjects: [],
    availableDays: [],
    pricePerHour: "",
    city: "",
    gender: "not set",
    introduction: "",
    availableFor: [],
  });
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teacherID, setTeacherID] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const navigate = useNavigate();

  const getTeacherID = () => {
    const cookie = cookies.get("TOKEN");
    const decoded = jwt_decode(cookie);
    setTeacherID(decoded.teacherId);
  };

  const editConfiguration = {
    method: "patch",
    url: `${process.env.REACT_APP_MODIFY_TEACHERS}${teacherID}`,
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
      subjects: signupData.subjects,
      availableDays: signupData.availableDays,
      pricePerHour: signupData.pricePerHour,
      city: signupData.city,
      gender: signupData.gender,
      introduction: signupData.introduction,
      availableFor: signupData.availableFor,
    },
  };

  const getUserData = async () => {
    if (token) {
      setIsLoading(true);
      try {
        await axios
          .get(`${process.env.REACT_APP_FETCH_SEARCHED}${teacherID}`)
          .then((res) => {
            setSignupData({
              firstName: res.data.data.firstName,
              lastName: res.data.data.lastName,
              email: res.data.data.email,
              password: "",
              subjects: [],
              availableDays: [],
              pricePerHour: res.data.data.pricePerHour,
              city: res.data.data.city,
              gender: res.data.data.gender,
              introduction: res.data.data.introduction,
              availableFor: [],
            });
            console.log(res.data.data);
          });
      } catch (err) {
        console.log(err);
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    if (token) {
      e.preventDefault();
      if (
        signupData.password !== confirmPassword ||
        signupData.password.length <= 7
      ) {
        setError(
          "Passwords doesn't match and Password must be minimum 8 characters and must contain one uppercase letter, one number and one symbol"
        );
        throw new Error(
          `Passwords doesn't match and Password must be minimum 8 characters and must contain one uppercase letter, one number and one symbol`
        );
      } else if (signupData.availableDays.length === 0) {
        setError("Available days field must be filled");
        throw new Error(`Available days field must be filled`);
      } else if (signupData.subjects.length === 0) {
        setError("Subjects field must be filled");
        throw new Error(`Subjects field must be filled`);
      } else if (signupData.availableFor.length === 0) {
        setError("Available for field must be filled");
        throw new Error(`Available for field must be filled`);
      } else {
        try {
          await axios(editConfiguration).then((res) => console.log(res));
          setSignupData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            subjects: [],
            availableDays: [],
            pricePerHour: "",
            city: "",
            gender: "not set",
            introduction: "",
            availableFor: [],
          });
          setConfirmPassword("");
          setError("");
          cookies.remove("TOKEN", { path: "/" });
          cookies.remove("USER", { path: "/" });
          navigate("/teacher-login");
        } catch (err) {
          console.log(err);
          if (err.response.data.name === "ValidationError") {
            setError(err.response.data.message.split(": ").slice(2));
            console.log(error);
          }
        }
      }
    } else {
      navigate("/", { replace: true });
    }
  };

  const deleteConfig = {
    method: "delete",
    url: `${process.env.REACT_APP_MODIFY_TEACHERS}${teacherID}`,
  };

  const handleDelete = async () => {
    if (token) {
      await axios(deleteConfig).then((res) => console.log(res));
      cookies.remove("TOKEN", { path: "/" });
      cookies.remove("USER", { path: "/" });
      navigate("/", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    getTeacherID();
  }, []);

  useEffect(() => {
    if (teacherID !== "") {
      getUserData();
    }
  }, [teacherID]);

  return {
    signupData,
    setSignupData,
    handleSubmit,
    handleDelete,
    isLoading,
    error,
    confirmPassword,
    setConfirmPassword,
  };
};
