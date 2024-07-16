const mongoose = require("mongoose");
const { expect } = require("chai");
const sinon = require("sinon");
const Task = require("../models/taskModel");
const mongoDB = require("../config/db");
const {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasks,
} = require("../services/taskService");

describe("Task Service", () => {
  let sandbox;

  before(async () => {
    await mongoDB();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should create a new task", async () => {
    const taskData = {
      title: "New Task",
      description: "Task description",
      completed: false,
      user: "userId",
    };
    const savedTask = { ...taskData, _id: "taskId" };

    sandbox.stub(Task.prototype, "save").resolves(savedTask);

    const result = await createTask(taskData);

    expect(result).to.include(taskData);
    expect(result).to.have.property("_id");
  });

  it("should get a task by ID", async () => {
    const taskId = "taskId";
    const userId = "userId";
    const task = {
      _id: taskId,
      title: "Test Task",
      description: "Task description",
      completed: false,
      user: userId,
    };

    sandbox.stub(Task, "findOne").resolves(task);

    const result = await getTaskById(taskId, userId);

    expect(result).to.include(task);
  });

  it("should update a task", async () => {
    const taskId = "taskId";
    const userId = "userId";
    const taskData = {
      title: "Updated Task",
      description: "Updated description",
      completed: true,
    };
    const updatedTask = { ...taskData, _id: taskId, user: userId };

    sandbox.stub(Task, "findOneAndUpdate").resolves(updatedTask);

    const result = await updateTask(taskId, taskData, userId);

    expect(result).to.include(taskData);
  });

  it("should delete a task", async () => {
    const taskId = "taskId";
    const userId = "userId";

    sandbox.stub(Task, "findOneAndDelete").resolves({});

    const result = await deleteTask(taskId, userId);

    expect(result).to.have.property("message", "Task removed");
  });

  it("should get a list of tasks", async () => {
    const userId = "userId";
    const tasks = [
      {
        _id: "taskId1",
        title: "Task 1",
        description: "Task 1 description",
        completed: false,
        user: userId,
      },
      {
        _id: "taskId2",
        title: "Task 2",
        description: "Task 2 description",
        completed: true,
        user: userId,
      },
    ];

    sandbox.stub(Task, "find").resolves(tasks);

    const result = await getTasks({}, userId);

    expect(result).to.be.an("array");
    expect(result).to.have.lengthOf(2);
  });
});
