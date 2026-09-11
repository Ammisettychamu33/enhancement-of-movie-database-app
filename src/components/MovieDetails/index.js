import React, {Component} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import './index.css'

const API_KEY = 'f864451050df9f9dc6706f908b31e870'

class MovieDetails extends Component {
  state = {
    isLoading: true,
    movieDetails: {},
    castDetails: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const castDetailsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

    const [movieResponse, castResponse] = await Promise.all([
      fetch(movieDetailsUrl),
      fetch(castDetailsUrl),
    ])

    if (movieResponse.ok && castResponse.ok) {
      const movieData = await movieResponse.json()
      const castData = await castResponse.json()

      const updatedMovieDetails = {
        id: movieData.id,
        title: movieData.title,
        posterPath: movieData.poster_path,
        backdropPath: movieData.backdrop_path,
        voteAverage: movieData.vote_average,
        runtime: movieData.runtime,
        releaseDate: movieData.release_date,
        overview: movieData.overview,
        genres: movieData.genres ? movieData.genres.map(g => g.name).join(', ') : '',
      }

      const updatedCastDetails = castData.cast
        ? castData.cast.map(each => ({
            id: each.id,
            originalName: each.original_name || each.name,
            character: each.character,
            profilePath: each.profile_path,
          }))
        : []

      this.setState({
        movieDetails: updatedMovieDetails,
        castDetails: updatedCastDetails,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </div>
  )

  renderMovieDetailsView = () => {
    const {movieDetails, castDetails} = this.state
    const {
      title,
      posterPath,
      backdropPath,
      voteAverage,
      runtime,
      releaseDate,
      overview,
      genres,
    } = movieDetails

    const posterUrl = posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : 'https://via.placeholder.com/500x750?text=No+Poster'

    const backdropUrl = backdropPath
      ? `https://image.tmdb.org/t/p/w1280${backdropPath}`
      : ''

    return (
      <div className="movie-details-content">
        <div
          className="movie-banner"
          style={
            backdropUrl
              ? {
                  backgroundImage: `linear-gradient(to right, rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.6)), url(${backdropUrl})`,
                }
              : {}
          }
        >
          <div className="movie-info-card">
            <img src={posterUrl} alt={title} className="movie-details-poster" />
            <div className="movie-info-details">
              <h1 className="movie-details-title">{title}</h1>
              <p className="movie-details-rating">Rating: {voteAverage}</p>
              <p className="movie-details-duration">{runtime} min</p>
              <p className="movie-details-genres">Genres: {genres}</p>
              <p className="movie-details-release">Release Date: {releaseDate}</p>
              <h2 className="overview-heading">Overview</h2>
              <p className="movie-overview">{overview}</p>
            </div>
          </div>
        </div>

        <div className="cast-section">
          <h1 className="cast-heading">Cast</h1>
          <ul className="cast-list">
            {castDetails.map(cast => {
              const castProfileUrl = cast.profilePath
                ? `https://image.tmdb.org/t/p/w500${cast.profilePath}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
              return (
                <li className="cast-item" key={cast.id}>
                  <img
                    src={castProfileUrl}
                    alt={cast.originalName}
                    className="cast-img"
                  />
                  <p className="cast-name">{cast.originalName}</p>
                  <p className="cast-character">Character: {cast.character}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="page-container">
        <NavBar />
        {isLoading ? this.renderLoadingView() : this.renderMovieDetailsView()}
      </div>
    )
  }
}

export default MovieDetails
