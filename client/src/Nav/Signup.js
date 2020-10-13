import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { signup } from '../redux/actions'
import { connect } from 'react-redux'

class SignUp extends React.Component {

  state = {
    name: "",
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
        <h1>Sign up</h1>
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <Label for="signupName">Name</Label>
            <Input
              type="text"
              name="name"
              id="signupName"
              placeholder="Name"
              value={this.state.name}
              onChange={this.changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="signupEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="signupEmail"
              placeholder="example@example.com"
              value={this.state.email}
              onChange={this.changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="signupPassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="signupPassword"
              placeholder="Password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
          </FormGroup>
          <Button color="primary">Submit</Button>
        </Form>
      </>
    )
  }
}

const mdp = dispatch => {
  return { submitHandler: userObj => dispatch(signup(userObj)) }
}

export default connect(null, mdp)(SignUp)
