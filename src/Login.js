import React, { Component } from 'react'

class Login extends Component {
  constructor () {
    super()
    this.state = { username: '', password: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    console.log(this.state.username)
    event.preventDefault()
  }

  handleInputChange (event) {
    this.setState
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          username :
          <input type='text' name='username' />
        </label>
        <br />
        <br />
        <label>
          password :
          <input type='password' name='password' />
        </label>
        <br />
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

export default Login
