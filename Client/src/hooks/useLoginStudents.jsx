import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const useLoginStudents = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
      });
      const [error, setError] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
    
    const cookies = new Cookies();

  const navigate = useNavigate();

    const configuration = {
        method: "post",
        url: process.env.REACT_APP_LOGIN_STUDENTS,
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
            cookies.set("USER", "student", {
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

    return{
        handleSubmit, error, isLoading, loginData, setLoginData
    }
}