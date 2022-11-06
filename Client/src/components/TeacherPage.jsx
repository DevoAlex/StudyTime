import axios from "axios";
import React, { useEffect, useState } from "react";
//import dogPic from '../../images/uploads/dog-propic.jpeg'

function TeacherPage() {
  const [teacher, setTeacher] = useState([]);

  const getUserInfo = async () => {
    await axios
      .get("http://localhost:3000/teachers/api/6367f0f3a96fcf9c64fcc6e4")
      .then((res) => {
        setTeacher(res.data.data);
        console.log(teacher.profileImage);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <h1>{teacher.firstName}</h1>
      <img
        src={`../../images/uploads/${teacher.profileImage}`}
        alt="Profile pic"
      />
      <h3>{teacher.pricePerHour}</h3>
      <h3>{teacher.subjects}</h3>
    </div>
  );
}

export default TeacherPage;
