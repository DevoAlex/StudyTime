import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const useLoginTeachers = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookies = new Cookies();

  const configuration = {
    method: "post",
    url: process.env.REACT_APP_LOGIN_TEACHERS,
    data: {
      email: loginData.email,
      password: loginData.password,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      setLoginData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      setError(true);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return {
    handleSubmit,
    loginData,
    setLoginData,
    error,
    isLoading,
  };
};
