import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/slices/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks } = useSelector((state) => state.task);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      const task = tasks.find((task) => task._id === id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    }
  }, [id, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
    } else {
      const resultAction = await dispatch(addTask({ title, description }));
      if (addTask.fulfilled.match(resultAction)) {
        navigate("/");
      }
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{id ? "Update Task" : "Add Task"}</button>
      </form>
    </div>
  );
};

export default TaskForm;
