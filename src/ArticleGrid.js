import React, { Component } from 'react'
import logo from './logo.svg'
import UserProfile from './UserProfile'

const articleDataGridTitleCss = {
  borderBottom: '3px solid red',
  textDecoration: 'none'
}
const pageNumberLiCss = {
  color: 'blue',
  userSelect: 'none',
  cursor: 'pointer',
  listStylePosition: 'inside',
  border: '1px solid black'
}

const pageNumberUlCss = {
  position: 'absolute',
  height: '20px',
  width: '400px',
  margin: 'auto',
  left: '40%',
  listStyle: 'none',
  display: 'flex'
}

const articleLiCss = {
  fontSize: 'medium',
  listStyle: 'none',
  borderRadius: '25px',
  background: '#DCDCDC',
  padding: '20px'
}

const articleDataGridCss = {
}
const articleDataGridDescriptionCss = {
  fontSize: 'x-small'
}
const articleUlCss = {
}


async function getArticles (bindedSetState) {
  try {
    let init = { mode: 'cors', headers: { Authorization: ('JWT ' + localStorage.getItem('JWT')) } }
    let response = await fetch('http://localhost:8000/feed_ninja/articles', init)
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
      articlesPerPage: 10,

      currentScreen: 'Articles'
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

  changeStateOfCurrentScreen (screenName) {
    this.setState({currentScreen: screenName})
  }

  render () {
    if (this.state.currentScreen === 'Articles') {
      const articles = this.state.articles
      const currentPage = this.state.currentPage
      const articlesPerPage = this.state.articlesPerPage
  
      const indexOfLastElement = currentPage * articlesPerPage
      const indexOfFirstElement = indexOfLastElement - articlesPerPage
      const currentArticles = articles.slice(indexOfFirstElement, indexOfLastElement)
  
      const renderedArticles = currentArticles.map((article, index) => {
        return (
          <div key={index}>
            <li style={articleLiCss}>
              <a style={articleDataGridTitleCss} target='_blank' href={article.link}>{article.title}</a>
              <p style={articleDataGridDescriptionCss}>{article.description}</p>
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
          <li id={number} onClick={this.handleClick} style={pageNumberLiCss}>
            {number}
          </li>
        )
      }
     )
      return (<div>
        <div>
          <button onClick={this.props.logoutFunction}> Logout </button>
          <button onClick={() => { this.changeStateOfCurrentScreen('preference') }}> Preference </button>
        </div>

        <div style={articleDataGridCss}>
          <ul style={articleUlCss}>
            {renderedArticles}
          </ul>
          <ul id='page-number-footer' style={pageNumberUlCss}>
            {renderedPageNumbers}
          </ul>
        </div>
      </div>
      )
    } else if (this.state.currentScreen === 'preference') {
      return (<UserProfile goBackFn={this.changeStateOfCurrentScreen.bind(this)} />)
    }
  }
}

export default ArticleGrid
