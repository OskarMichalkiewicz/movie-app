import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../components/MovieItem';


class MoviesList extends Component {

  render() {
    const { movies, ratings } = this.props;
    let loading = movies.length < 1 ? true : false
      if(loading){
          return(
              <div>
                  Loading...
              </div>
          )
      }else{
        let movieList = movies.map(m => (
            <MovieItem
              ratings={ratings.filter(r=> r.movie._id === m._id)}
              key={m._id}
              id={m._id}
              title={m.title}
              summary={m.summary}
              imgUrl={m.imgUrl}
              genre={m.genre}
            />
          ));
        return movieList;
      }
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies.movies,
    ratings: state.ratings.ratings
  };
}

export default connect(
  mapStateToProps,
  null
)(MoviesList);
