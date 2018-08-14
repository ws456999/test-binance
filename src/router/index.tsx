import * as React from 'react'
import Home from '@/pages/home'
import Trade from '@/pages/trade'
import { hot } from 'react-hot-loader'

import {
  BrowserRouter as Router,
  // Redirect,
  Route,
  // Switch
} from 'react-router-dom'

const routes = () => (
  <Router>
    <div>
      <Route path='/' exact strict component={Home} />
      <Route path='/trade' exact component={Trade} />
    </div>
  </Router>
)

export default hot(module)(routes)
