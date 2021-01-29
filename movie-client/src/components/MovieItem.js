import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const MovieItem = ({ title, imgUrl, summary, genre, id, ratings }) => {
  const genreString = genre.join(', ');
  const limitSummary = summary.substring(0, 240) + '...';
  
  const values = ratings.map(r => r.score);
  const score = values.reduce((a, b) => a + b, 0)/values.length
  console.log(score);
  return (
    <div className='card' style={{padding: 0}}>
      <div className='w-100'>
        <img style={{height: '100%'}} src={imgUrl} alt={title} />
      </div>

      <div className='w-100 mx-2 d-flex-col-between'>
        <div>
        <h1 className='hide-sm'>{title}</h1>
        <Rating  color={'#333333'} score={score} id={id} edit={false} />
        </div>

        
        <p className='hide-sm'>{limitSummary}</p>
        <h3 className='my-3 hide-sm'>{genreString}</h3>
        <div style={{marginBottom: '0.4rem'}}>
          <Link
            to={{
              pathname: `/movie/${id}`,
              state: {
                title,
                imgUrl,
                summary,
                genre,
                id,
                score
              }
            }}
            className='btn btn-dark btn-block-sm'
          >
            More
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default MovieItem;
