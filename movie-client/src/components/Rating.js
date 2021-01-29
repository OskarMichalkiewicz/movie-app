import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {postRating} from '../store/actions/ratings'
import { connect } from 'react-redux';

class Rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0
    };
    this.onStarClick = this.onStarClick.bind(this)
  }

   onStarClick(nextValue, prevValue, name) {
    const body={
      movieId: this.props.id,
      userId: this.props.userId,
      score: nextValue
    }
    this.setState({rating: nextValue});
    console.log(body)
    this.props.postRating(body)
  }

  render() {
    const { rating } = this.state;
    return (
        <div className='lead m-0'>
          <StarRatingComponent
            name='app6'
            starCount={10}
            editing={this.props.edit}
            emptyStarColor={this.props.color}
            value={rating || this.props.score}
            onStarClick={this.onStarClick}
          />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}


export default connect(
  mapStateToProps,
  { postRating }
)(Rating);
