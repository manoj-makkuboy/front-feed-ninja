import React, { Component } from 'react'

class UserProfile extends Component {
  constructor () {
    super()
    this.state = {categories: [], categoryCheckbox: {}}

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setStateOfCategories (inputCategories) {
    let categoryCheckboxTemp = {}
    for (let i = 0; i < inputCategories.length; i++) {
      categoryCheckboxTemp[inputCategories[i]] = false
    }

    this.setState({categories: inputCategories, categoryCheckbox: categoryCheckboxTemp})
  }

  componentDidMount () {
    let bindedSetStateOfCategories = this.setStateOfCategories.bind(this)
    // generate checkboxes
    let init = {mode: 'cors', headers: {Authorization: ('JWT ' + localStorage.getItem('JWT'))}}
    fetch('http://localhost:8000/custom-user/categories', init)
    .then(function (response) { return response.json() })
    .then(function (responseJson) {
      bindedSetStateOfCategories(responseJson['category_list'])
    })
  }

  handleChange (e) {
    const target = e.target
    const name = target.name
    const value = target.checked

    const dummy = this.state.categoryCheckbox
    dummy[name] = value
    this.setState({ categoryCheckbox: dummy })
    console.log(this.state)
  }
  handleSubmit (e) {
    console.log(this.state)
    // Payload prep
    let categoryCheckbox = this.state.categoryCheckbox
    let categoryArray = []
    for (let category in categoryCheckbox) {
      if (categoryCheckbox[category] === true) {
        categoryArray.push(category)
      }
    }
    let categoriesObj = {categories: categoryArray} // suitable format the backend accepts
    // preparing the request
    let init = {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: ('JWT ' + localStorage.getItem('JWT'))
      },
      method: 'POST',
      body: JSON.stringify(categoriesObj)
    }
    fetch('http://localhost:8000/custom-user/update-category', init)
    .then(function (response) { return response.json() })
    .then(function (responseJson) { console.log(responseJson) })
 
    e.preventDefault()
  }

  render () {
    const categories = this.state.categories
    let generatedCheckbox = categories.map((category, index) => {
      return (
        <div key={index}>
          <label>
            {category}
            <input type='checkbox' name={category} onChange={this.handleChange.bind(this)} checked={this.state.categoryCheckbox[{category}]} />
          </label>
        </div>
      )
    }
    )
    return (

      <div>
        <button onClick={() => this.props.goBackFn('Articles')}> Back </button>
        <form onSubmit={this.handleSubmit}>
          <ul> { generatedCheckbox } </ul>
          <input type='submit' value='Save' />
        </form>
      </div>
    )
  }
}

export default UserProfile
