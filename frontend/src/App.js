import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import TaskList from "./components/task/TaskList";
import TaskForm from "./components/task/TaskForm";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="/tasks/:id/edit" element={<TaskForm />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
