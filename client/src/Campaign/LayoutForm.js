import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { createCampaign } from '../redux/actions'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

class LayoutForm extends React.Component {

  state = {
    name: "",
    subject: "",
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.submitHandler(this.state).then(() => {
      this.props.history.push(this.props.redirectTo)
    })
  }

  render() {
    const { editorState } = this.state;

    return (
      <Switch>
        <Route exact path='/campaigns/create' render={() => {
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
                <Button color="primary" >Next</Button>
              </Form>
            </>)
        }} />
      </Switch>
    )
  }
}

const msp = state => {
  return { campaigns: state.campaigns, redirectTo: state.redirectTo }
}

const mdp = dispatch => {
  return { submitHandler: campaignObj => dispatch(createCampaign(campaignObj)) }
}

export default withRouter(connect(msp, mdp)(LayoutForm))
