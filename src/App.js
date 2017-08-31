import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

let sample_article = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
//	{"title": "title_value", "author": "author_value"},
//	{"title": "title_value1", "author": "author_value1"}


class App extends Component {
  constructor() {
  	super();
	this.state = {articles : sample_article,
			currentPage : 1,
			articlesPerPage : 3}
	this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e){
    this.setState({currentPage: Number(e.target.id)})
    console.log(this.state)
  }

  render () {
   const articles = this.state.articles
   const currentPage = this.state.currentPage
   const articlesPerPage = this.state.articlesPerPage

   const indexOfLastPage = currentPage * articlesPerPage
   const indexOfFirstPage = indexOfLastPage - articlesPerPage
	  
   const currentArticles = articles.slice(indexOfFirstPage, indexOfLastPage)
   
   const renderedArticles = currentArticles.map((article, index) => {return (<li key={index}>{article}</li>)})

   // Logic for displaying page numbers

   const pageNumbers = []
   for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++){
   	pageNumbers.push(i)
   }
  

   const renderedPageNumbers = pageNumbers.map(number => { return (
	   							<li key={number} id={number} onClick={this.handleClick}>
   								{number}
   								</li>);}
						   )
   return (<div>
	     <ul>
	   	{renderedArticles}
	     </ul>
	     
	   	{renderedPageNumbers}
	    
	   </div>
   );


}
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
