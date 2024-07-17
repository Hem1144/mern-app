import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/slices/taskSlice";
import TaskItem from "./TaskItems";
import apiService from "../../services/apiService";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      apiService.setAuthHeader(token);
      dispatch(fetchTasks(token));
    }
  }, [dispatch, token]);

  return (
    <div>
      <h2>Task List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
