

  import { ADD_TASK, SHOW_TASKS, DELETE_TASK, EDIT_TASK, CLEAR_LAST_ACTION } from "../actions/types";

const initialState = {
  tasks: [],      
  lastAction: null,
  lastTask: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
    return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        lastAction: action.lastAction,
        lastTask: action.lastTask
    };

    case SHOW_TASKS:
      return {
        ...state,
        tasks: action.payload || [],   // replace with stored list
        loading: false,
        // lastAction: action.lastAction,
        // lastTask: action.lastTask
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        lastAction: action.lastAction,
        lastTask: action.lastTask
      };

    case EDIT_TASK:
        const updatedTasks = state.tasks.map((task, idx) =>
        idx === action.payload.id ? action.payload.updatedTask : task
    );
      return {
        ...state,
        tasks: updatedTasks,
        loading: false,
        lastAction: action.lastAction,
        lastTask: action.lastTask
      };

    case CLEAR_LAST_ACTION:
      return { ...state, lastAction: null, lastTask: null };

    default:
      return state;
  }
}
