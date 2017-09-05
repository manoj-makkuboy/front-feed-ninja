import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Logout from './Logout'

async function getArticles (bindedSetState) {
  try {
    let response = await fetch('http://localhost:8000/feed_ninja/articles?page=1', {mode: 'cors'})
    bindedSetState({articles: await response.json()})
  } catch (error) {
    console.error(error)
  }
}

class ArticleGrid extends Component {
  constructor () {
    super()
    this.state = {
      articles: [],
      currentPage: 1,
      articlesPerPage: 3
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    this.setState({currentPage: Number(e.target.id)})
  }

  componentDidMount () {
    let bindedSetState = this.setState.bind(this)
    getArticles(bindedSetState)
  /*  fetch('http://localhost:8000/feed_ninja/articles?page=1', {mode: 'cors'})
      .then(function (response) {  Promise.resolve(response)
      console.log(response.json()) })
//      .then(function (responseJson) { bindedSetState({articles: responseJson}) })
   */
  }

  render () {
    const articles = this.state.articles
    const currentPage = this.state.currentPage
    const articlesPerPage = this.state.articlesPerPage

    const indexOfLastElement = currentPage * articlesPerPage
    const indexOfFirstElement = indexOfLastElement - articlesPerPage
    const currentArticles = articles.slice(indexOfFirstElement, indexOfLastElement)

    const renderedArticles = currentArticles.map((article, index) => {
      return (
        <div key={index}>
          <li>
            <ul>
              <li >{article.title}</li>
              <li> {article.description}</li>
            </ul>
          </li>
        </div>
      )
    })

   // Logic for displaying page numbers

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderedPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>)
    }
   )
    return (<div>
      <div>
        <Logout />
      </div>
      <ul>
        {renderedArticles}
      </ul>

      {renderedPageNumbers}

    </div>
    )
  }
}

export default ArticleGrid
