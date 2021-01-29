import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import { addMovie } from '../store/actions/movies';

import Movie from '../components/Movie';
import AddMovieForm from '../components/AddMovieForm';

const Main = props => {
  const { addMovie, authUser, errors, removeError, currentUser } = props;

  return (
    <div className='container'>
      <Switch>
        <Route
          exact
          path='/'
          render={props => <Homepage currentUser={currentUser} auth {...props} />}
        />
        <Route
          exact
          path='/movie/:id'
          render={props => <Movie currentUser={currentUser} {...props} />}
        />
        <Route
          exact
          path='/addmovie'
          render={props => {
            return (
              <AddMovieForm
                removeError={removeError}
                errors={errors}
                onAdd={addMovie}
                buttonText='Add Movie'
                heading='Add a new Movie'
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path='/signin'
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText='Log in'
                heading='Welcome back'
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path='/signup'
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText='Sign up'
                heading='Make an Account'
                {...props}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    { authUser, removeError, addMovie }
  )(Main)
);
