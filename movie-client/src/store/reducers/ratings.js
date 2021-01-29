import { LOAD_RATINGS, ADD_RATING, REMOVE_RATING } from '../actionTypes';

export default (state = { ratings: [] }, action) => {
  switch (action.type) {
    case LOAD_RATINGS:
      return {
        ...state,
        ratings: action.ratings
      };
    case REMOVE_RATING:
      return {
        ...state,
        ratings: state.ratings.filter(r => r._id === action.rating._id)
      };
    default:
      return state;
  }
};
