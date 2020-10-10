import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { createCampaign } from '../redux/actions'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { withRouter } from 'react-router-dom'
import Templates from './Templates'

class CreateForm extends React.Component {

  state = {
    name: "",
    subject: "",
    template_id: 0,
    segment_id: 0
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    const campaignObj = {
      name: this.state.name,
      subject: this.state.subject,
      from: this.props.currentUser.email,
      template_id: this.state.template_id,
      segment_id: this.state.segment_id,
      user_id: this.props.currentUser.id
    }
    this.props.submitHandler(campaignObj).then(() => {
      this.props.history.push(this.props.redirectTo)
    })
  }

  selectHanlder = e => {
    const foundTemplate = this.props.templates.find(template => template.id === parseInt(e.target.id))
    this.setState({ template_id: foundTemplate.id })
  }

  dropDownHandler = e => {
    this.setState({segment_id: parseInt(e.target.value)})
  }

  genOptions = () => {
    if (this.props.currentUser) {
      return this.props.currentUser.segments.map(segment => {
        return <option key={segment.id} value={segment.id}>{segment.name}</option>
      })
    }
  }

  render() {
    return (
      <>
        <h1>Create New Campaign</h1>
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <Label for="name">Campaign name</Label>
            <Input type="text" name="name" id="name" value={this.state.name} onChange={this.changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label for="segment">Select segment</Label>
            <Input type="select" name="segment_id" id="segment" onChange={this.dropDownHandler}>
              <option></option>
              {this.genOptions()}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input type="text" name="subject" id="subject" value={this.state.subject} onChange={this.changeHandler} />
          </FormGroup>
          <Templates templates={this.props.templates} templateId={this.state.template_id} selectHanlder={this.selectHanlder} />
          <Button color="primary" style={{ marginTop: "30px" }}>Next</Button>
        </Form>
      </>
    )
  }
}

const msp = state => {
  return { campaigns: state.campaigns, redirectTo: state.redirectTo, templates: state.templates, currentUser: state.currentUser }
}

const mdp = dispatch => {
  return { submitHandler: campaignObj => dispatch(createCampaign(campaignObj)) }
}

export default withRouter(connect(msp, mdp)(CreateForm))
