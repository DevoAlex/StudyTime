import axios from "axios";
import React, { useEffect, useState } from "react";

function TeacherPage() {
  const [teacher, setTeacher] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const getUserInfo = async () => {
    setIsLoading(true)
    try{
    await axios
      .get("http://localhost:3000/teachers/api/636d2320e50c8278aef6e01b")
      .then((res) => {
          setTeacher(res.data.data);
     });
    } catch(err) {
      console.log(err)
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  };


  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <h1>{teacher.firstName}</h1>
      <h3>{teacher.pricePerHour}</h3>
      <h3>{teacher.subjects}</h3>
    </div>
  );
}

export default TeacherPage;
