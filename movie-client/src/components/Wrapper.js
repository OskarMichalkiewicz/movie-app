import React from 'react'
import MovieList from '../containers/MoviesList'
import Search from '../containers/Search'

const Wrapper = props => {
    return (
        <div>
            <Search/>
            <MovieList/>
        </div>
    )
}

export default Wrapper
