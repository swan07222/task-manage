import { ADD_TASK, SHOW_TASKS, DELETE_TASK, EDIT_TASK, CLEAR_LAST_ACTION } from "./types";

// Add a task
export const addTask = (task) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  return {
    type: ADD_TASK,
    payload: task,
    lastAction: "ADD_TASK",
    lastTask: {task}
  };
};

// Show tasks (no lastAction needed)
export const showTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return {
    type: SHOW_TASKS,
    payload: tasks
  };
};

// Delete a task
export const deleteTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  return {
    type: DELETE_TASK,
    payload: id,
    lastAction: "DELETE_TASK",
    lastTask: { id }
  };
};

// Edit a task
export const editTask = (updatedTask) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
  localStorage.setItem("tasks", JSON.stringify(newTasks));

  return {
    type: EDIT_TASK,
    payload: updatedTask,
    lastAction: "EDIT_TASK",
    lastTask: updatedTask
  };
};

// Clear last action
export const clearLastAction = () => ({
  type: CLEAR_LAST_ACTION
});
