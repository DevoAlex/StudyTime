import React, { useEffect } from "react";
import axios from 'axios';

function StudentLogin() {

  const prova = async() => {
    await axios.get('https://study-time-api.herokuapp.com/')
    .then((res) => {
      console.log(res.data)
    })
  }

  useEffect(() => {
    prova()
  }, [])
  return (
    <div>StudentLogin</div>
  )
}

export default StudentLogin