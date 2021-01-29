import { LOAD_MOVIES} from "../actionTypes";

export default (state = { movies: [] }, action) => {
  switch (action.type) {
    case LOAD_MOVIES:
      return {
        ...state,
        movies: action.movies};
    default:

      return state;
  }
};
