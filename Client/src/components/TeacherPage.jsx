import axios from "axios";
import React, { useEffect, useState } from "react";

function TeacherPage() {
  const [teacher, setTeacher] = useState([]);
  const [propic, setPropic] = useState('')
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  //let profilepic = require(`../../public/images/uploads`)

  const getUserInfo = async () => {
    setIsLoading(true)
    try{
    await axios
      .get("http://localhost:3000/teachers/api/6367f0f3a96fcf9c64fcc6e4")
      .then((res) => {
        
        setTeacher(res.data.data);
        
        setPropic(res.data.data.profileImage);
     });
    } catch(err) {
      console.log(err)
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  };

  const fetchImage = async() => {
    await axios.get('uploads/default-propic.jpeg')
    .then((res) => {
      console.log(res)
      setImage(res)
    })
  }



  useEffect(() => {
    getUserInfo();
    fetchImage();
  }, []);

  return (
    <div>
      <h1>{teacher.firstName}</h1>
      <img
        src={image}
        alt={teacher.profileImage}
      />
      <h3>{teacher.pricePerHour}</h3>
      <h3>{teacher.subjects}</h3>
    </div>
  );
}

export default TeacherPage;
