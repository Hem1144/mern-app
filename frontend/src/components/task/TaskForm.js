import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addTask, updateTask, fetchTasks } from "../../redux/slices/taskSlice";
const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    if (id) {
      const task = tasks.find((task) => task.id === parseInt(id));
      if (task) {
        setFormData({ title: task.title, description: task.description });
      }
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(updateTask({ taskId: id, taskData: formData }));
    } else {
      await dispatch(addTask(formData));
    }
    dispatch(fetchTasks());
    navigate("/");
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          {id ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
