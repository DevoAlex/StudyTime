import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const useEditStudents = () => {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const navigate = useNavigate();

  const getUserID = () => {
    const cookie = cookies.get("TOKEN");
    const decoded = jwt_decode(cookie);
    setUserID(decoded.studentId);
  };

  const editConfiguration = {
    method: "patch",
    url: `${process.env.REACT_APP_MODIFY_STUDENTS}${userID}`,
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
    },
  };

  const deleteConfig = {
    method: "delete",
    url: `${process.env.REACT_APP_MODIFY_STUDENTS}${userID}`,
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
      } else if (signupData.firstName === "") {
        setError("First name field must be filled");
        throw new Error(`First name field must be filled`);
      } else if (signupData.lastName === "") {
        setError("Last name field must be filled");
        throw new Error(`Last name field must be filled`);
      } else if (signupData.email === "") {
        setError("Email field must be filled");
        throw new Error(`Email field must be filled`);
      } else {
        try {
          await axios(editConfiguration).then((res) => console.log(res));
          setSignupData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          setConfirmPassword("");
          setError("");
          cookies.remove("TOKEN", { path: "/" });
          cookies.remove("USER", { path: "/" });
          navigate("/student-login");
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

  const handleDelete = async () => {
    await axios(deleteConfig).then((res) => console.log(res));
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("USER", { path: "/" });
    navigate("/", { replace: true });
  };

  const getUserData = async () => {
    if (token) {
      setIsLoading(true);
      try {
        await axios
          .get(`${process.env.REACT_APP_FETCH_STUDENTS}${userID}`)
          .then((res) => {
            setSignupData({
              firstName: res.data.data.firstName,
              lastName: res.data.data.lastName,
              email: res.data.data.email,
              password: "",
            });
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

  useEffect(() => {
    getUserID();
  }, []);

  useEffect(() => {
    getUserData();
  }, [userID]);

  return {
    signupData,
    setSignupData,
    editConfiguration,
    handleSubmit,
    handleDelete,
    isLoading,
    setIsLoading,
    error,
    confirmPassword,
    setConfirmPassword
  };
};
