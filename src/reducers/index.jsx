// src/reducers/index.js
import { combineReducers } from "redux";

// Example: a simple dummy reducer
const dummyReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dummy: dummyReducer
});

export default rootReducer;
