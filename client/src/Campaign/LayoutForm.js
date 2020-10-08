import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { createCampaign } from '../redux/actions'

class LayoutForm extends React.Component {
  state = {
    name: "",
    subject: "",
    to: "",
    content: ""
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
        <h1>Create New Campaign</h1>
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="campaign-name" value={this.state.name} onChange={this.changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input type="text" name="subject" id="campaign-subject" value={this.state.subject} onChange={this.changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label for="to">To</Label>
            <Input type="email" name="to" id="campaign-to" placeholder="example@example.com" value={this.state.to} onChange={this.changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label for="content">Content</Label>
            <Input type="textarea" name="content" id="campaign-content" value={this.state.content} onChange={this.changeHandler} />
          </FormGroup>
          <Button color="primary">Send</Button>
        </Form>
      </>
    )
  }
}

const mdp = dispatch => {
  return { submitHandler: () => dispatch(createCampaign()) }
}

export default connect(null, mdp)(LayoutForm)
