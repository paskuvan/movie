import React from 'react'

const MovieCard = ({ movie: 
    {title, vote_average, poster_path, release_date, original_language} 
}) => {
  return (
    <div className='movie-card text-center p-4 rounded-lg'>
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` :
      '/no-movie.png'} />
      
        <div className='mt-4'>
        <p className="text-white">{title}</p>
        </div>
    </div>
  )
}

export default MovieCard