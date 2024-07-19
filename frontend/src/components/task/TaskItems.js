import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTaskAsync, fetchTasks } from "../../redux/slices/taskSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/TaskItem.css";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/tasks/${task._id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      try {
        await dispatch(deleteTaskAsync(task._id));
        toast.success("Task deleted successfully", {
          position: "top-right",
        });
        dispatch(fetchTasks());
      } catch (error) {
        toast.error("Failed to delete task", {
          position: "top-right",
        });
      }
    }
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
