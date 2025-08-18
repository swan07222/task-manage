import { ADD_TASK, SHOW_TASKS , DELETE_TASK } from "./types";

// Redux action to add a task
export const addTask = (task) => {
  // Save to localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Return Redux action
  return {
    type: ADD_TASK,
    payload: task
  };
};

export const showTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return {
    type: SHOW_TASKS,
    payload: tasks
  };
};

export const deleteTask = (id) => {
  // Remove from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(id, 1); // remove the task at index id
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Return Redux action
  return {
    type: DELETE_TASK,
    payload: id
  };
};