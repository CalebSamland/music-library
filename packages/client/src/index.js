import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import Album from 'components/Album'
import './index.css'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>  
      <Switch>
        <Route exact path='/' component={HomePage} />
        {/* <Route exact path='/albums' component={Album} /> */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
