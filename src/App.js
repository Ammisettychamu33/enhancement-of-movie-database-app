import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'
import SearchQuery from './components/SearchQuery'
import './App.css'

const App = () => (
  <div className="app-container">
    <Switch>
      <Route exact path="/" component={Popular} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/movie/:id" component={MovieDetails} />
      <Route exact path="/search" component={SearchQuery} />
    </Switch>
  </div>
)

export default App
