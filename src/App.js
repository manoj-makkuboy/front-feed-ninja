import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

let sample_article = [
	{"title": "title_value", "author": "author_value"},
	{"title": "title_value1", "author": "author_value1"}
]

class App extends Component {
  render () {
    return (
      <div className='App'>
	 <Articles id="0"/>
	 <Articles id="1"/>
      </div>
    )
  }

  getArticles(){}
}

class Articles extends Component {
  render () {
    return (<div>
	    	<ol>
		    <li> {sample_article[this.props.id]['title']} </li>
		    <li> {sample_article[this.props.id]['author']} </li>
	    	</ol>
	    </div>
    )

  }
}


export default App
