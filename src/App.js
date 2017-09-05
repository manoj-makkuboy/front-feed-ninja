import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import ArticleGrid from './ArticleGrid.js'
import Login from './Login.js'

class App extends Component {
  constructor () {
    super()
    this.state = { isLoggedIn: false }
  /*  this.state = {
      articles: [],
      currentPage: 1,
      articlesPerPage: 3
    } */
  }

  render () {
    if (this.state.isLoggedIn) {
      return (
        <ArticleGrid />
      )
    } else {
      return (
        <Login />
      )
    }
  }
}

export default App
