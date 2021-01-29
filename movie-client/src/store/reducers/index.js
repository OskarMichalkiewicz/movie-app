import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import movies from './movies'
import ratings from './ratings'

const rootReducer = combineReducers({
  currentUser,
  errors,
  movies,
  ratings
});

export default rootReducer;
