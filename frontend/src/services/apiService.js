import axios from "axios";

const BASE_URL = "http://localhost:5000";

const apiService = {
  setAuthHeader(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  },
  getAuthHeader() {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  },
  async login(email, password) {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    if (response.data.token) {
      this.setAuthHeader(response.data.token);
    }
    return response.data;
  },
  async register(username, email, password) {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      username,
      email,
      password,
    });
    // if (response.data.token) {
    //   this.setAuthHeader(response.data.token);
    // }
    return response.data;
  },
  async fetchTasks() {
    const response = await axios.get(`${BASE_URL}/tasks`, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  },
  async addTask(taskData) {
    const response = await axios.post(`${BASE_URL}/tasks`, taskData, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  },
  async updateTask(taskId, taskData) {
    const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, taskData, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  },
  async deleteTask(taskId) {
    const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
      headers: this.getAuthHeader(),
    });
    return response.data;
  },
};

export default apiService;
