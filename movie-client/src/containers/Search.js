import React, { Component } from 'react';
import {fetchMovies} from '../store/actions/movies'
import {fetchRatings} from '../store/actions/ratings'
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  componentDidMount(){
      this.props.fetchRatings()
      this.props.fetchMovies()
  }
  onSubmit = e => {
    e.preventDefault()
    this.props.fetchMovies(this.state.text)
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.fetchMovies(this.state.text)
  };
  render() {
    const { text } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Movies...'
            value={text}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='search'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      movies: state.movies,
      ratings: state.ratings
    };
  }

export default connect(
  mapStateToProps,
  { fetchMovies, fetchRatings }
)(Search);
