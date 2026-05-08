import React from 'react'
import { Button, Alert } from 'reactstrap'
import { signup, login } from '../redux/actions'
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

  demoLogin = () => {
    this.props.demoHandler({ email: "demo@mailzilla.com", password: "demo1234" })
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
      <div className="signup" style={{ width: "500px" }}>
        <div className="main">
          <h1>Welcome to MailZilla</h1>
          {this.state.errorMessages ?
            <Alert color="danger">
              <ul>
                {this.state.errorMessages.map(msg => <li key={this.state.errorMessages.indexOf(msg)}>{msg}</li>)}
              </ul>
            </Alert>
            : null
          }
          <div className="auth-msg">Already have an account? <a href="/login">Log in</a></div>
          <div className="auth-form">
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
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Button color="success" outline onClick={this.demoLogin} style={{ width: "100%" }}>
                <span role="img" aria-label="rocket">🚀</span> Try Demo
              </Button>
              <small style={{ color: "#888", display: "block", marginTop: "6px" }}>
                demo@mailzilla.com / demo1234
              </small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mdp = dispatch => {
  return {
    submitHandler: userObj => dispatch(signup(userObj)),
    demoHandler: userObj => dispatch(login(userObj))
  }
}

export default connect(null, mdp)(SignUp)
