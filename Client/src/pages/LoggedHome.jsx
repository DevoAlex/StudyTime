import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

function LoggedHome() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();

  const getUserData = () => {
    const cookie = cookies.get("TOKEN");
    const decoded = jwt_decode(cookie);
    console.log(decoded);
  };

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      await axios
        .get("https://study-time-api.herokuapp.com/teachers/api")
        .then((res) => {
          const data = res.data.data;
          setTeachers(data);
        });
      console.log(teachers);
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchTeachers();
    getUserData();
  }, []);

  return (
    <>
      {" "}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {teachers.map((item) => {
            return (
              <div key={item._id}>
                <h1>Hi i'm {item.firstName}</h1>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default LoggedHome;
