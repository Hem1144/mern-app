import apiService from "../apiService";
import axios from "axios";

jest.mock("axios");

describe("apiService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sets the authorization header and stores the token in localStorage", () => {
    apiService.setAuthHeader("test-token");
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "test-token");
    expect(axios.defaults.headers.common["Authorization"]).toBe(
      "Bearer test-token"
    );
  });

  it("removes the authorization header and token from localStorage", () => {
    apiService.setAuthHeader(null);
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(axios.defaults.headers.common["Authorization"]).toBeUndefined();
  });

  it("logs in and sets the authorization header", async () => {
    const response = { data: { token: "test-token" } };
    axios.post.mockResolvedValue(response);
    const data = await apiService.login("test@example.com", "password123");
    expect(data).toEqual(response.data);
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "test-token");
  });

  it("fetches tasks with authorization header", async () => {
    const tasks = [{ id: 1, title: "Task 1" }];
    axios.get.mockResolvedValue({ data: tasks });
    const data = await apiService.fetchTasks();
    expect(data).toEqual(tasks);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/tasks`, {
      headers: {},
    });
  });
});
