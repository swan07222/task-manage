import { ADD_TASK, SHOW_TASKS , DELETE_TASK, EDIT_TASK} from "../actions/types";

const initialState = {
    task: [],
    loading: true,
    error: {}
};
  


export default function(state = initialState, action) {
    switch(action.type) {
  
        case ADD_TASK:
            return {
                ...state,
                task: action.payload,
                loading: false
            };

        case SHOW_TASKS:
            return {
                ...state,
                tasks: action.payload || [], // replace with stored list
                loading: false
            };

            case DELETE_TASK:
                return {
                  ...state,
                  tasks: state.tasks.filter((task) => task.id !== action.payload)
                };
              
        case EDIT_TASK:
            const updatedTasks = state.tasks.map((task, idx) =>
                idx === action.payload.id ? action.payload.updatedTask : task
            );
            return { ...state, tasks: updatedTasks, loading: false };
  
      default:
        return state;
    }
  }