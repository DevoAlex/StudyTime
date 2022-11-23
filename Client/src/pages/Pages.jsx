import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentSignup from "./StudentSignup";
import StudentLogin from "./StudentLogin";
import TeacherSignup from "./TeacherSignup";
import TeacherLogin from "./TeacherLogin";
import Home from "./Home";
import LoggedHome from "./LoggedHome";
import StudentEdit from "./StudentEdit";
import TeacherEdit from './TeacherEdit';
import Searched from "./Searched";
import ProtectedRoute from "../components/ProtectedRoutes";

function Pages() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/teacher-login" element={<TeacherLogin />} />
      <Route path="/teacher-signup" element={<TeacherSignup />} />
      <Route exact path="/home" element={<ProtectedRoute />}>
        <Route path="/home" element={<LoggedHome />} />
      </Route>
      <Route exact path="/student-edit" element={<ProtectedRoute />}>
        <Route path="/student-edit" element={<StudentEdit />} />
      </Route>
      <Route exact path="/teacher-edit" element={<ProtectedRoute />}>
        <Route path="/teacher-edit" element={<TeacherEdit />} />
      </Route>
      <Route path="/searched" element={<ProtectedRoute />}>
        <Route path="/searched/:search" element={<Searched />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <h4 style={{ padding: "2rem" }}>
      You have landed on a page that doesn't exist
    </h4>
  );
}

export default Pages;
