import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTaskAsync } from "../../redux/slices/taskSlice";
import "../../styles/TaskItem.css";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-task/${task._id}`);
  };

  const handleDelete = () => {
    dispatch(deleteTaskAsync(task._id));
  };

  return (
    <div className="task-item">
      <div className="task-details">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
      </div>
      <div className="task-actions">
        <button onClick={handleEdit} className="edit-button">
          Edit
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
