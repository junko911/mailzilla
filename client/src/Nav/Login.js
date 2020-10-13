import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { login } from '../redux/actions'
import { connect } from 'react-redux'

class Login extends React.Component {

  state = {
    email: "",
    password: ""
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
        <h1>Login</h1>
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <Label for="login">Email</Label>
            <Input
              type="email"
              name="email"
              id="login"
              placeholder="example@example.com"
              value={this.state.email}
              onChange={this.changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
          </FormGroup>
          <Button color="primary">Log in</Button>
        </Form>
      </>
    )
  }
}

const mdp = dispatch => {
  return { submitHandler: userObj => dispatch(login(userObj)) }
}

export default connect(null, mdp)(Login)
