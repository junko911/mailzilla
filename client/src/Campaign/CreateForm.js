import React from 'react'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { createCampaign } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import Templates from './Templates'
import { getTemplates, createSegment } from '../redux/actions'

class CreateForm extends React.Component {

  state = {
    name: "",
    subject: "",
    template_id: null,
    segment_id: 0,
    segmentForm: false,
    segmentName: "",
    errorMessages: null
  }

  componentDidMount() {
    this.props.fetchTemplates()
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
    this.props.submitHandler(campaignObj).then(data => {
      if (data) {
        this.setState({ errorMessages: data.errors })
      }
    })
  }

  selectHanlder = e => {
    const foundTemplate = this.props.templates.find(template => template.id === parseInt(e.target.id))
    this.setState({ template_id: foundTemplate.id })
  }

  dropDownHandler = e => {
    if (e.target.value === "create") {
      this.setState({ segmentForm: true })
    } else {
      this.setState({ segment_id: parseInt(e.target.value), segmentForm: false })
    }
  }

  genOptions = () => {
    if (this.props.segments) {
      return this.props.segments.map(segment => {
        return <option key={segment.id} value={segment.id}>{segment.name}</option>
      })
    }
  }

  formHandler = e => {
    this.setState({ segmentName: e.target.value })
  }

  createSegment = () => {
    this.props.createSegment({ name: this.state.segmentName }).then(() => {
      this.setState({ segmentForm: false, segmentName: "" })
    })
  }

  render() {
    const segmentForm = this.state.segmentForm ? "block" : "none"
    const segmentFormBtn = this.state.segmentForm ? "inline" : "none"

    return (
      <>
        <h1 className="title">Create New Campaign</h1>
        {this.state.errorMessages ?
          <Alert color="danger">
            <ul>
              {this.state.errorMessages.map(msg => <li key={this.state.errorMessages.indexOf(msg)}>{msg}</li>)}
            </ul>
          </Alert>
          : null
        }
        <div className="main">
          <Form onSubmit={this.submitHandler}>
            <FormGroup>
              <Label for="name">Campaign name</Label>
              <Input type="text" name="name" id="name" value={this.state.name} onChange={this.changeHandler} />
            </FormGroup>
            <FormGroup>
              <Label for="segment">Select a segment</Label>
              <Input type="select" name="segment_id" id="segment" onChange={this.dropDownHandler}>
                <option></option>
                <option value="create">Create a new segment</option>
                {this.genOptions()}
              </Input>
              <Label for="segmentForm" style={{ display: segmentForm, marginTop: "10px" }}>Enter segment name</Label>
              <Input type="text" style={{ display: segmentForm }} id="segmentForm" value={this.state.segmentName} onChange={this.formHandler} />
              <Button color="primary" size="sm" style={{ display: segmentFormBtn, marginTop: "10px" }} onClick={this.createSegment}>Create</Button>
              <Button color="secondary" size="sm" style={{ display: segmentFormBtn, marginTop: "10px", marginLeft: "10px" }} onClick={() => this.setState({ segmentForm: false })}>Cancel</Button>
            </FormGroup>
            <FormGroup>
              <Label for="subject">Subject</Label>
              <Input type="text" name="subject" id="subject" value={this.state.subject} onChange={this.changeHandler} />
            </FormGroup>
            {this.props.templates ?
              <Templates templates={this.props.templates} templateId={this.state.template_id} selectHanlder={this.selectHanlder} />
              : null
            }
            <Button color="primary" style={{ marginTop: "30px" }}>Next</Button>
          </Form>
        </div>
      </>
    )
  }
}

const msp = state => {
  return {
    templates: state.templates,
    currentUser: state.currentUser,
    segments: state.segments
  }
}

const mdp = dispatch => {
  return {
    createSegment: segmentObj => dispatch(createSegment(segmentObj)),
    submitHandler: campaignObj => dispatch(createCampaign(campaignObj)),
    fetchTemplates: () => dispatch(getTemplates())
  }
}

export default withRouter(connect(msp, mdp)(CreateForm))
