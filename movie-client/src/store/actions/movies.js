import { apiCall } from '../../services/api';
import { LOAD_MOVIES } from '../actionTypes';
import { addError, removeError } from './errors';

export function loadMovies(movies) {
  return { type: LOAD_MOVIES, movies };
}

export function addMovie(value) {
  return dispatch => {
        console.log('here from addMovie function')
    return new Promise((resolve, reject) => {
    return apiCall('post', '/movies', value)
      .then(res => {
        dispatch(removeError())
        resolve();
      })
      .catch(err => {
        dispatch(addError(err.message));
        reject();
      });
    });
  }
} 

export const fetchMovies = (value) => {
  return dispatch => {
    return apiCall('get', (!value ?  '/movies' : `/movies/search/${value}`))
      .then(res => {
        dispatch(loadMovies(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};
export const fetchMovie = (id) => {
  return dispatch => {
    return apiCall('get', `/movies/${id}`)
      .then(res => {
        dispatch(loadMovies(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

