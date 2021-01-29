import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { BrowserRouter as Router} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Navbar from './containers/Navbar'
import Main from './containers/Main'
import './App.css';
import { setAuthorizationToken, setCurrentUser } from './store/actions/auth';

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  }catch(e){
    store.dispatch(setCurrentUser({}))
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
        <Navbar />
        <Main/>
    </Router>
  </Provider>
);

export default App;
