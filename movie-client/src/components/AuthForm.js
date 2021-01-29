import React, { Component } from 'react';


class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? 'signup' : 'login';
    console.log(this.state, this.props, authType)
    this.props.onAuth(authType, this.state).then(() => {
      console.log('here')
      this.props.history.push('/');
    }).catch(()=>{
      return
    })
  };

  render() {
    const { username} = this.state;
    const {
      heading,
      buttonText,
      errors,
      history,
      removeError
    } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <h2>{heading}</h2>
          {errors.message && (
            <div className={`alert alert-danger`}>
              <i className='fas fa-info-circle' /> {errors.message}
            </div>
          )}
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Username'
            value={username}
            onChange={this.onChange}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            onChange={this.onChange}
          />
          <input
            type='submit'
            value={buttonText}
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}

export default AuthForm;
