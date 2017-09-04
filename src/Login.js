import React, { Component } from 'react'

class Login extends Component {
  constructor () {
    super()
    this.state = { username: '', password: '' }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          username :
          <input type='text' name='username' />
        </label>

        <label>
          password :
          <input type='password' name='password' />
        </label>
      </form>
    )
  }
}
