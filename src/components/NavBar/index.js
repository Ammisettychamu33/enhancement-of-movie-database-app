import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class NavBar extends Component {
  state = {
    searchInput: '',
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = event => {
    if (event) {
      event.preventDefault()
    }
    const {searchInput} = this.state
    const {history, onSearchInputChange} = this.props
    if (onSearchInputChange) {
      onSearchInputChange(searchInput)
    }
    history.push(`/search?query=${encodeURIComponent(searchInput)}`)
  }

  render() {
    const {searchInput} = this.state

    return (
      <nav className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand-link">
            <h1 className="navbar-heading">movieDB</h1>
          </Link>

          <ul className="navbar-menu">
            <li className="navbar-menu-item">
              <Link to="/" className="nav-link">
                Popular
              </Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/top-rated" className="nav-link">
                Top Rated
              </Link>
            </li>
            <li className="navbar-menu-item">
              <Link to="/upcoming" className="nav-link">
                Upcoming
              </Link>
            </li>
          </ul>

          <form className="search-form" onSubmit={this.onSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="submit"
              className="search-button"
              onClick={this.onSearch}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavBar)
