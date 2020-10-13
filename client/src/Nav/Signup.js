import React from 'react'
import { Button, Alert } from 'reactstrap'
import { signup } from '../redux/actions'
import { connect } from 'react-redux'
import { AvForm, AvField } from 'availity-reactstrap-validation'

class SignUp extends React.Component {

  state = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    errorMessages: null
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    this.props.submitHandler(this.state).then(data => {
      if (data) {
        this.setState({ errorMessages: data.errors })
      }
    })
  }

  render() {
    return (
      <>
        <h1>Sign up</h1>
        {this.state.errorMessages ?
          <Alert color="danger">
            <ul>
              {this.state.errorMessages.map(msg => <li key={this.state.errorMessages.indexOf(msg)}>{msg}</li>)}
            </ul>
          </Alert>
          : null
        }
        <AvForm onValidSubmit={this.submitHandler}>
          <AvField
            type="text"
            name="name"
            label="Name"
            errorMessage="Please enter your name"
            required
            onChange={this.changeHandler}
          />
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
            name="password_confirmation"
            label="Password Confirmation"
            errorMessage="Please enter your password"
            onChange={this.changeHandler}
            required
          />
          <Button color="primary">Sign up</Button>
        </AvForm>
      </>
    )
  }
}

const mdp = dispatch => {
  return { submitHandler: userObj => dispatch(signup(userObj)) }
}

export default connect(null, mdp)(SignUp)
