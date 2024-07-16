import Task from "../models/taskModel.js";

/**
 * Create a new task
 * @param {Object} taskData
 * @returns {Object}
 */
export const createTask = async (taskData) => {
  const task = new Task(taskData);
  await task.save();
  return task;
};

/**
 * Get a task by ID
 * @param {String} id
 * @param {String} userId
 * @returns {Object|null}
 */
export const getTaskById = async (id, userId) => {
  const task = await Task.findOne({ _id: id, user: userId });
  return task;
};

/**
 * Update a task by ID
 * @param {String} id
 * @param {Object} taskData
 * @param {String} userId
 * @returns {Object|null}
 */
export const updateTask = async (id, taskData, userId) => {
  const task = await Task.findOneAndUpdate(
    { _id: id, user: userId },
    taskData,
    { new: true }
  );
  return task;
};

/**
 * Delete a task by ID
 * @param {String} id
 * @param {String} userId
 * @returns {Object}
 */
export const deleteTask = async (id, userId) => {
  await Task.findOneAndDelete({ _id: id, user: userId });
  return { message: "Task removed" };
};

/**
 * Get a list of tasks
 * @param {Object} query
 * @param {String} userId
 * @returns {Array}
 */
export const getTasks = async (query, userId) => {
  const { page = 1, limit = 10, search = "", sort = "createdAt" } = query;
  const tasks = await Task.find({
    user: userId,
    title: { $regex: search, $options: "i" },
  })
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  return tasks;
};
