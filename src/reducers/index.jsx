import { combineReducers } from "redux";
import taskadd from "./task";

// Example: a simple dummy reducer
const dummyReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Combine reducers correctly
const rootReducer = combineReducers({
  dummy: dummyReducer,
  task: taskadd,
});

export default rootReducer;