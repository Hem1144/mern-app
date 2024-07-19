import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItems";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/TaskList.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddTask = () => {
    navigate("/tasks/new");
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter(
        (task) =>
          task &&
          task.title &&
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="task-list-container">
      <ToastContainer />
      <div className="task-list-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleAddTask} className="new-task">
          Add a New Task
        </button>
      </div>
      <ul className="task-list">
        {currentTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredTasks.length / tasksPerPage) },
          (_, index) => (
            <button
              key={index}
              className="pagination-button"
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TaskList;
