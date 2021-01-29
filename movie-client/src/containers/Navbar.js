import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import { addMovie } from '../store/actions/movies';

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <Link to='/'>
          <i className='fas fa-film' />
          </Link>
        </h1>
        {this.props.currentUser.isAuthenticated ? (
          <ul>
            <li>
              <Link to='/addmovie'>Add Movie</Link>
            </li>
            <li>
              <a onClick={this.logout} href='/'>Log out</a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to='/signup'>Sign up</Link>
            </li>
            <li>
              <Link to='/signin'>Log in</Link>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(
  mapStateToProps,
  { logout, addMovie }
)(Navbar);
