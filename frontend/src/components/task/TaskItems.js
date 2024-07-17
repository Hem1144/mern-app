import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/tasks/${task._id}/edit`);
  };

  return (
    <li>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <button onClick={handleEdit}>Edit</button>
    </li>
  );
};

export default TaskItem;
