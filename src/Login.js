import React, { Component } from 'react'
import ArticleGrid from './ArticleGrid.js'

async function sendUserCredentials (bindedSetState, username, password) {
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
      bindedSetState({ jwt: jwtToken })
      localStorage.setItem('JWT', jwtToken)
    } else {
      console.log('User Authentication Failed')
    }
  } catch (error) {
    console.error(error)
  }
}
class Login extends Component {
  constructor () {
    super()
    this.state = {username: '', password: '', jwt: null}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    sendUserCredentials(this.setState.bind(this), this.state.username, this.state.password)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  render () {
    if (this.state.jwt !== null) {
      return (<ArticleGrid />)
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
