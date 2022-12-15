import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const useSignupTeachers = () => {
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

  const cookies = new Cookies();

  const navigate = useNavigate();

  const configuration = {
    method: "post",
    url: process.env.REACT_APP_SIGNUP_TEACHERS,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (signupData.password === confirmPassword) {
      try {
        await axios(configuration).then((res) => {
          cookies.set("TOKEN", res.data.token, {
            path: "/",
          });
          cookies.set("USER", "teacher", {
            path: "/",
          });
          navigate("/home", { replace: true });
        });
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
      } catch (err) {
        console.log(err.response.data);
        setIsLoading(false);
        if (err.response.data.name === "ValidationError") {
          setError(err.response.data.message.split(": ").slice(2));
          console.log(error);
        }
      }
      setIsLoading(false);
    } else {
      setError("Passwords does not match");
      throw new Error(`Passwords does not match`);
    }
  };
  return {
    handleSubmit,
    signupData,
    setSignupData,
    confirmPassword,
    setConfirmPassword,
    error,
    isLoading,
  };
};
