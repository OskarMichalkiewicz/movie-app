import { apiCall } from '../../services/api';
import { addError, removeError } from './errors';
import { LOAD_RATINGS, ADD_RATING, REMOVE_RATING } from '../actionTypes';

export function loadRatings(ratings) {
  return { type: LOAD_RATINGS, ratings };
}
export function addRating(rating) {
  return { type: ADD_RATING, rating };
}
export function removeRating(rating) {
  return { type: REMOVE_RATING, rating };
}


export const fetchRatings = (id) => {
  return dispatch => {
    return apiCall('get', (id ? `/ratings/${id}` : `/ratings`))
      .then(res => {
        dispatch(loadRatings(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};
export function postRating(body) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall('post', `/ratings`, body)
        .then(() => {
          dispatch(removeError())
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}
