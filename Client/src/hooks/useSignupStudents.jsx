import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const useSignupStudents = () => {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();

  const navigate = useNavigate();

  const configuration = {
    method: "post",
    url: process.env.REACT_APP_SIGNUP_STUDENTS,
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
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

          cookies.set("USER", "student", {
            path: "/",
          });
          navigate("/home", { replace: true });
        });
        setSignupData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
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
    isLoading,
    error,
    confirmPassword,
    setConfirmPassword,
  };
};
