import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper'

const Homepage = ({currentUser}) => {
    if(!currentUser.isAuthenticated){
        return (
          <div className='all-center'>
            <h1>HOMEPAGE</h1>
            <Link to='/signup' className='btn btn-dark'>
              Sign up here
            </Link>
          </div>
        );
    }
    return (
        <div>
            <Wrapper/>
        </div>
    )
};

export default Homepage;
