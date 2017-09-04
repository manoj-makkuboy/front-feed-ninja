import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import ArticleGrid from './ArticleGrid.js'
import Login from './Login.js'

class App extends Component {
  constructor () {
    super()
  /*  this.state = {
      articles: [],
      currentPage: 1,
      articlesPerPage: 3
    } */
  }

  render () {
    return (
      <Login />
    )
  }
}

export default App
