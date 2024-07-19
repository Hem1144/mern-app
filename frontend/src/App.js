import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import TaskList from "./components/task/TaskList";
import TaskForm from "./components/task/TaskForm";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/PrivateRoute";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element=<TaskList /> />
        <Route
          path="/tasks/new"
          element={<ProtectedRoute element={<TaskForm />} />}
        />
        <Route
          path="/tasks/:id"
          element={<ProtectedRoute element={<TaskForm />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
