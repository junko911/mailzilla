import React from 'react'
import { Button, Alert } from 'reactstrap'
import { login } from '../redux/actions'
import { connect } from 'react-redux'
import { AvForm, AvField } from 'availity-reactstrap-validation';

class Login extends React.Component {

  state = {
    email: "",
    password: "",
    errorMessage: null
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    this.props.submitHandler(this.state).then(data => {
      if (data) {
        this.setState({ errorMessage: data.message })
      }
    })
  }

  render() {
    return (
      <div className="login" style={{ width: "350px" }}>
        <h1>Log In</h1>
        {this.state.errorMessage ?
          <Alert color="danger">
            {this.state.errorMessage}
          </Alert>
          : null
        }
        <div className="auth-msg">Need a MailZilla account? <a href="/signup">Create an account</a></div>
        <div className="auth-form">
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
            <Button color="primary">Log in</Button>
          </AvForm>
        </div>
      </div>
    )
  }
}

const mdp = dispatch => {
  return { submitHandler: userObj => dispatch(login(userObj)) }
}

export default connect(null, mdp)(Login)
