import React, { useState } from 'react'
import { Button, Badge, Col, Row, Form, Input, FormGroup, Label, } from 'reactstrap'
import moment from 'moment'
import Stats from './Stats'
import { updateCampaign, createSegment } from "../redux/actions";
import { connect } from "react-redux"

const Details = props => {

  const [formDisplay, setFormDisplay] = useState(false)
  const [campaignName, setCampaignName] = useState(props.campaign.name)
  const [segmentForm, setSegmentForm] = useState(false)
  const [segmentName, setSegmentName] = useState("")
  const [dropdownDisplay, setDropdownDisplay] = useState(false)
  const [fromForm, setFromForm] = useState(false)
  const [from, setFrom] = useState("")
  const [subjectForm, setSubjectForm] = useState(false)
  const [subject, setSubject] = useState("")

  const toggleEditForm = () => {
    setFormDisplay(!formDisplay)
  }

  const changeHandler = e => {
    setCampaignName(e.target.value)
  }

  const editHandler = e => {
    e.preventDefault()
    props.editHandler(props.campaign.id, "name", campaignName).then(data => {
      toggleEditForm()
    })
  }

  const editForm = formDisplay ? "block" : "none"
  const editFormBtn = formDisplay ? "none" : "block"

  const genOptions = () => {
    if (props.segments) {
      return props.segments.map(segment => {
        return <option key={segment.id} value={segment.id}>{segment.name}</option>
      })
    }
  }

  const dropDownHandler = e => {
    if (e.target.value === "create") {
      setSegmentForm("display")
    } else {
      props.editHandler(props.campaign.id, "segment_id", parseInt(e.target.value)).then(() => {
        setDropdownDisplay(false)
      })
    }
  }

  const createSegment = () => {
    props.createSegment({ name: segmentName }).then(data => {
      props.editHandler(props.campaign.id, "segment_id", data.payload.id).then(() => {
        setSegmentForm(false)
        setDropdownDisplay(false)
      })
    })
  }

  const fromFormHandler = e => {
    props.editHandler(props.campaign.id, "from", from).then(() => {
      setFromForm(false)
    })
  }

  const subjectFormHandler = e => {
    props.editHandler(props.campaign.id, "subject", subject).then(() => {
      setSubjectForm(false)
    })
  }

  return (
    <>
      {props.campaign ?
        <>
          <div className="title">
            <h1 style={{ display: editFormBtn }}>{props.campaign.name} <Badge pill>{props.campaign.status[0].toUpperCase() + props.campaign.status.slice(1)}</Badge></h1>
            {props.campaign.status === "draft" ?
              <>
                <Form onSubmit={e => editHandler(e, "name", campaignName)}>
                  <FormGroup style={{ display: editForm, width: "300px" }}>
                    <Input type="text" value={campaignName} onChange={changeHandler} />
                    <Button color="primary" size="sm" style={{ width: "100px", float: "none", marginTop: "10px" }}>Save</Button>
                    <span className="edit" style={{ textDecoration: "underline", marginLeft: "20px" }} onClick={toggleEditForm}>Cancel</span>
                  </FormGroup>
                </Form>
                <span className="edit" style={{ display: editFormBtn }} onClick={toggleEditForm}>Edit name</span>
                <small>Created <strong>{moment(props.campaign.created_at).format('lll')}</strong></small>
              </>
              :
              <small>Sent <strong>{moment(props.campaign.sent_at).format('lll')}</strong></small>
            }
            <Button
              color="primary"
              style={{ marginRight: "220px" }}
              href={`/campaigns/${props.campaign.id}/preview`}
            >
              Preview
              </Button>
            <Button
              color="secondary"
              href={`/campaigns`}
            >
              Go back to campaigns
              </Button>
          </div>
          <div className="main">
            <div style={{ margin: "0 20px", lineHeight: "45px" }}>
              <Row style={{ borderBottom: "1px solid #dedddc" }}>
                <Col xs="4">
                  <h4>&nbsp;&nbsp;Segment</h4></Col>
                <Col xs="6">
                  <div style={{ display: dropdownDisplay ? "none" : "block" }}>{props.campaign.segment.name}</div>
                  <Form style={{ display: dropdownDisplay ? "block" : "none" }}>
                    <FormGroup>
                      <Label for="segment">Select a segment</Label>
                      <Input type="select" name="segment_id" id="segment" onChange={dropDownHandler}>
                        <option></option>
                        <option value="create">Create a new segment</option>
                        {genOptions()}
                      </Input>
                      <Label for="segmentForm" style={{ display: segmentForm ? "block" : "none", marginTop: "10px" }}>Enter segment name</Label>
                      <Input type="text" style={{ display: segmentForm ? "block" : "none" }} id="segmentForm" value={segmentName} onChange={e => setSegmentName(e.target.value)} />
                      <Button color="primary" size="sm" style={{ display: segmentForm ? "inline" : "none", marginTop: "10px" }} onClick={createSegment}>Create</Button>
                      <Button color="secondary" size="sm" style={{ display: dropdownDisplay ? "inline" : "none", marginTop: "10px", marginLeft: segmentForm ? "10px" : "0px" }} onClick={() => { setDropdownDisplay(false); setSegmentForm(false) }}>Cancel</Button>
                    </FormGroup>
                  </Form>
                </Col>
                <Col xs="2">
                  {props.campaign.status === "draft" ? <Button size="sm" style={{ display: dropdownDisplay ? "none" : "block" }} onClick={() => setDropdownDisplay(true)}>Change segment</Button> : null}
                </Col>
              </Row>
              <Row style={{ borderBottom: "1px solid #dedddc" }}>
                <Col xs="4">
                  <h4 style={{ display: "inline" }}>&nbsp;&nbsp;From</h4></Col>
                <Col xs="6">
                  <Form style={{ marginTop: "10px", display: fromForm ? "block" : "none" }}>
                    <FormGroup style={{ width: "300px" }}>
                      <Input type="text" value={from} onChange={e => setFrom(e.target.value)} />
                      <Button color="primary" size="sm" style={{ marginTop: "10px" }} onClick={fromFormHandler}>Save</Button>
                      <Button color="secondary" size="sm" style={{ display: fromForm ? "inline" : "none", marginTop: "10px", marginLeft: "10px" }} onClick={() => setFromForm(false)}>Cancel</Button>
                    </FormGroup>
                  </Form>
                  <div style={{ display: fromForm ? "none" : "block" }}>{props.campaign.from}</div>
                </Col>
                <Col xs="2">
                  {props.campaign.status === "draft" ? <Button size="sm" onClick={() => setFromForm(true)} style={{ display: fromForm ? "none" : "inline" }}>Change from</Button> : null}
                </Col>
              </Row>
              <Row>
                <Col xs="4">
                  <h4 style={{ display: "inline" }}>&nbsp;&nbsp;Subject</h4></Col>
                <Col xs="6">
                  <Form style={{ marginTop: "10px", display: subjectForm ? "block" : "none" }} onSubmit={subjectFormHandler}>
                    <FormGroup style={{ width: "300px" }}>
                      <Input type="text" value={subject} onChange={e => setSubject(e.target.value)} />
                      <Button color="primary" size="sm" style={{ marginTop: "10px" }} onClick={subjectFormHandler}>Save</Button>
                      <Button color="secondary" size="sm" style={{ display: subjectForm ? "inline" : "none", marginTop: "10px", marginLeft: "10px" }} onClick={() => setSubjectForm(false)}>Cancel</Button>
                    </FormGroup>
                  </Form>
                  <div style={{ display: subjectForm ? "none" : "block" }}>{props.campaign.subject}</div>
                </Col>
                <Col xs="2">
                  {props.campaign.status === "draft" ? <Button size="sm" onClick={() => setSubjectForm(true)} >Change subject</Button> : null}
                </Col>
              </Row>
            </div>
          </div>
          {props.campaign.status === "sent" ?
            <Stats campaign={props.campaign} />
            : null
          }
        </>
        : null}
    </>
  )
}

const msp = state => {
  return {
    segments: state.segments
  }
}

const mdp = dispatch => {
  return {
    editHandler: (id, field, value) => dispatch(updateCampaign(id, field, value)),
    createSegment: segmentObj => dispatch(createSegment(segmentObj))
  }
}

export default connect(msp, mdp)(Details)
