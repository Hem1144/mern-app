import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await apiService.fetchTasks();
  return response.tasks;
});

export const addTask = createAsyncThunk("tasks/addTask", async (newTask) => {
  const response = await apiService.addTask(newTask);
  return response.data;
});

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await apiService.deleteTask(taskId);
    return taskId;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData }) => {
    const response = await apiService.updateTask(taskId, taskData);
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => {
          return task.id === task._id;
        });

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
