import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './Login.js'
import UserProfile from './UserProfile'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render () {
   return ( <MuiThemeProvider>
	   <Login />
 		</ MuiThemeProvider>
   )
	   
  // return (<UserProfile />)
  }
}

export default App
