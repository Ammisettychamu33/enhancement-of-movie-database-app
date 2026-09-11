import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  return (
    <li className="movie-card-item">
      <img src={posterUrl} alt={title} className="movie-poster" />
      <h1 className="movie-title">{title}</h1>
      <p className="movie-rating">Rating: {voteAverage}</p>
      <Link to={`/movie/${id}`}>
        <button type="button" className="view-details-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
