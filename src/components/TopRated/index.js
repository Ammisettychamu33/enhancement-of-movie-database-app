import React, {Component} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

const API_KEY = 'f864451050df9f9dc6706f908b31e870'

class TopRated extends Component {
  state = {
    isLoading: true,
    moviesData: [],
    page: 1,
    totalPages: 500,
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    const {page} = this.state
    this.setState({isLoading: true})
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        title: each.title,
        posterPath: each.poster_path,
        voteAverage: each.vote_average,
      }))
      this.setState({
        moviesData: updatedData,
        totalPages: data.total_pages || 500,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false})
    }
  }

  onPrevPage = () => {
    const {page} = this.state
    if (page > 1) {
      this.setState(prevState => ({page: prevState.page - 1}), this.getTopRatedMovies)
    }
  }

  onNextPage = () => {
    const {page, totalPages} = this.state
    if (page < totalPages) {
      this.setState(prevState => ({page: prevState.page + 1}), this.getTopRatedMovies)
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </div>
  )

  renderMoviesView = () => {
    const {moviesData} = this.state

    return (
      <ul className="movies-list">
        {moviesData.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, page, totalPages} = this.state

    return (
      <div className="page-container">
        <NavBar />
        <div className="content-container">
          {isLoading ? this.renderLoadingView() : this.renderMoviesView()}
          <Pagination
            pageNo={page}
            totalPages={totalPages}
            onPrevPage={this.onPrevPage}
            onNextPage={this.onNextPage}
          />
        </div>
      </div>
    )
  }
}

export default TopRated
