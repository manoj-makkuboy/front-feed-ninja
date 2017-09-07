import React, { Component } from 'react'
import ArticleGrid from './ArticleGrid.js'
import Dialog from 'material-ui/Dialog'

async function loginUser (bindedSetState, username, password) {
  let init = {
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({'username': username, 'password': password})
  }
  try {
    let response = await fetch('http://localhost:8000/rest-auth/login/', init)
    let responseJson = await response.json()
    if (response.ok) {
      let jwtToken = responseJson['token']
      localStorage.setItem('JWT', jwtToken)
      bindedSetState({ jwt: jwtToken })
      return true
    }
    return false
  } catch (error) {
    console.error(error)
  }
}

class Login extends Component {
  constructor () {
    super()
    this.state = {username: '', password: '', jwt: null, authFailed: false}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    if (loginUser(this.setState.bind(this), this.state.username, this.state.password) === false) {
      console.log('User Authentication Failed')
    }
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  logoutUser () {
    localStorage.removeItem('JWT')

    console.log(this,'user logout succesful')
    this.setState({ jwt: null })
  }

  render () {
    if (this.state.jwt) {
      return (<ArticleGrid logoutFunction={this.logoutUser.bind(this)} />)
    }
    return (

      <form onSubmit={this.handleSubmit}>
        <label>
          username :
          <input type='text' onChange={this.handleInputChange} value={this.state.username} name='username' />
        </label>
        <br />
        <br />
        <label>
          password :
          <input type='password' name='password' onChange={this.handleInputChange} value={this.state.password} />
        </label>
        <br />
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

export default Login
