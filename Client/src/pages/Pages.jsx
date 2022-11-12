import React from "react";
import { Route, Routes } from 'react-router-dom'
import StudentSignup from "./StudentSignup";
import StudentLogin from './StudentLogin'
import TeacherSignup from './TeacherSignup'
import TeacherLogin from './TeacherLogin'
import Home from "./Home";

function Pages() {
    return(
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/teacher-login" element={<TeacherLogin />} />
            <Route path="/teacher-signup" element={<TeacherSignup />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

function NotFound() {
    return <h4 style={{padding: '2rem'}}>You have landed on a page that doesn't exist</h4>
}

export default Pages