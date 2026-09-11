import React, {Component} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

const API_KEY = 'f864451050df9f9dc6706f908b31e870'

class SearchQuery extends Component {
  state = {
    isLoading: true,
    searchResults: [],
    page: 1,
    totalPages: 1,
  }

  componentDidMount() {
    this.getSearchResults()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setState({page: 1}, this.getSearchResults)
    }
  }

  getQueryParam = () => {
    const {location} = this.props
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('query') || ''
  }

  getSearchResults = async () => {
    const {page} = this.state
    const query = this.getQueryParam()
    if (!query) {
      this.setState({isLoading: false, searchResults: []})
      return
    }
    this.setState({isLoading: true})
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query,
    )}&page=${page}`
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
        searchResults: updatedData,
        totalPages: data.total_pages || 1,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false})
    }
  }

  onPrevPage = () => {
    const {page} = this.state
    if (page > 1) {
      this.setState(prevState => ({page: prevState.page - 1}), this.getSearchResults)
    }
  }

  onNextPage = () => {
    const {page, totalPages} = this.state
    if (page < totalPages) {
      this.setState(prevState => ({page: prevState.page + 1}), this.getSearchResults)
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </div>
  )

  renderResultsView = () => {
    const {searchResults} = this.state
    const query = this.getQueryParam()

    if (searchResults.length === 0) {
      return (
        <div className="no-results-container">
          <h1 className="no-results-heading">No results found for "{query}"</h1>
        </div>
      )
    }

    return (
      <ul className="movies-list">
        {searchResults.map(movie => (
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
          <h1 className="page-heading">Search Results</h1>
          {isLoading ? this.renderLoadingView() : this.renderResultsView()}
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

export default SearchQuery
