import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

ReactDOM.render(
  // <Provider store={store}>
  //   <Routes />
  // </Provider>,
  <h1> TESTING </h1>,
  document.getElementById('app')
)