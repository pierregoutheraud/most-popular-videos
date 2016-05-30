import '../styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Home from './pages/Home.jsx'

/*
(function() {
  var e = document.createElement('script');
  e.async = true;
  e.src = 'https://api.dmcdn.net/all.js';

  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(e, s);
}());

window.dmAsyncInit = function() {
  console.log('dmAsyncInit');
  window.DM.init({
    apiKey: '537f4fad3143ce59a831',
    status: true, // check login status
    cookie: true // enable cookies to allow the server to access the session
  })
  renderApp()
}
*/

function renderApp() {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
    </Router>
    , document.querySelector('.app')
  )
}
renderApp()
