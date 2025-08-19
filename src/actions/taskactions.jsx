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
  // Get tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Filter out the task with matching id
  const updatedTasks = tasks.filter((task) => task.id !== id);

  // Save updated list back
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  // Return Redux action
  return {
    type: DELETE_TASK,
    payload: id
  };
};
