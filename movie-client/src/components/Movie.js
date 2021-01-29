import React, { Component } from 'react';
import Rating from './Rating';

class Movie extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      title,
      imgUrl,
      summary,
      genre,
      id,
      score
    } = this.props.location.state;
    const userId = this.props.currentUser.user.id
    console.log(userId)
    let genreString = genre.join(', ');
    return (
      <div className='card d-flex-col p-0'>
        <div style={{ height: '50%' }} className=' d-flex-col'>
          <div
            style={{ paddingBottom: '0' }}
            className='d-flex-between w-100 p-1 bg-dark'
          >
            <div>
              <h1>{title}</h1>
              <p>{genreString}</p>
            </div>
            <div>
                <p className='large m-0'>
                  <i style={{ color: `#ffb400` }} className='fas fa-star'></i>
                  {(Math.round(score*100))/100}
                  <span className='lead m-0'>/10</span>
                </p>
                <Rating score={score} id={id} userId={userId} color={'#f4f4f4'} edit={true} />
            </div>
          </div>
          <div className='d-flex'>
            <div style={{ lineHeight: '0' }} className='w-50 '>
              <img src={imgUrl} alt={title}  />
            </div>
            <div className='p-2 w-100'>
              <p className='lead'>{summary}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;