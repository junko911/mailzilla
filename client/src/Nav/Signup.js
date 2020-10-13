import React from 'react'
import { Button } from 'reactstrap'
import { signup } from '../redux/actions'
import { connect } from 'react-redux'
import { AvForm, AvField } from 'availity-reactstrap-validation'

class SignUp extends React.Component {

  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errorMessage: null
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.submitHandler(this.state)
  }

  render() {
    return (
      <>
        <h1>Sign up</h1>
        <AvForm onValidSubmit={this.submitHandler}>
          <AvField
            type="email"
            name="email"
            label="Email"
            errorMessage="Please enter your email"
            required
            onChange={this.changeHandler}
          />
          <AvField
            type="password"
            name="password"
            label="Password"
            errorMessage="Please enter your password"
            required
            onChange={this.changeHandler}
          />
          <AvField
            type="password"
            name="passwordConfirmation"
            label="Password Confirmation"
            errorMessage="Please enter your password"
            onChange={this.changeHandler}
          />
          <Button color="primary">Log in</Button>
        </AvForm>
      </>
    )
  }
}

const mdp = dispatch => {
  return { submitHandler: userObj => dispatch(signup(userObj)) }
}

export default connect(null, mdp)(SignUp)
