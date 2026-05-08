import React, { useState } from 'react'
import { Button, Badge, Col, Row, Form, Input, FormGroup, Label, } from 'reactstrap'
import moment from 'moment'
import Stats from './Stats'
import { updateCampaign, createSegment } from "../redux/actions";
import { connect } from "react-redux"

const statusBadgeColor = status => {
  switch (status) {
    case 'sent': return 'success'
    case 'sending': return 'info'
    case 'draft': return 'secondary'
    default: return 'secondary'
  }
}

const Details = props => {

  const [nameForm, setNameForm] = useState(false)
  const [campaignName, setCampaignName] = useState(props.campaign.name)
  const [segmentForm, setSegmentForm] = useState(false)
  const [segmentName, setSegmentName] = useState("")
  const [dropdownDisplay, setDropdownDisplay] = useState(false)
  const [fromForm, setFromForm] = useState(false)
  const [from, setFrom] = useState(props.campaign.from)
  const [subjectForm, setSubjectForm] = useState(false)
  const [subject, setSubject] = useState(props.campaign.subject)

  const nameFormHandler = e => {
    e.preventDefault()
    props.editHandler(props.campaign.id, "name", campaignName).then(() => {
      setNameForm(false)
    })
  }

  const genSegmentOptions = () => {
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

  const fromFormHandler = () => {
    props.editHandler(props.campaign.id, "from", from).then(() => {
      setFromForm(false)
    })
  }

  const subjectFormHandler = e => {
    if (e && e.preventDefault) e.preventDefault()
    props.editHandler(props.campaign.id, "subject", subject).then(() => {
      setSubjectForm(false)
    })
  }

  return (
    <>
      {props.campaign ?
        <>
          <div className="title campaign-detail-header">
            <div className="campaign-detail-header-text">
              <h1 style={{ display: nameForm ? "none" : "block" }}>
                {props.campaign.name}{' '}
                <Badge pill color={statusBadgeColor(props.campaign.status)}>
                  {props.campaign.status.replace(/^\w/, c => c.toUpperCase())}
                </Badge>
              </h1>
              {props.campaign.status === "draft" ?
                <>
                  <Form onSubmit={e => nameFormHandler(e)}>
                    <FormGroup style={{ display: nameForm ? "block" : "none", maxWidth: "360px" }}>
                      <Input type="text" value={campaignName} onChange={e => setCampaignName(e.target.value)} />
                      <div style={{ marginTop: "10px" }}>
                        <Button color="primary" size="sm">Save</Button>
                        <span className="edit" style={{ textDecoration: "underline", marginLeft: "16px" }} onClick={() => setNameForm(false)} role="button" tabIndex={0}>Cancel</span>
                      </div>
                    </FormGroup>
                  </Form>
                  <span className="edit" style={{ display: nameForm ? "none" : "inline-block", marginBottom: "6px" }} onClick={() => setNameForm(true)} role="button" tabIndex={0}>Edit name</span>
                  <div><small>Created <strong>{moment(props.campaign.created_at).format('lll')}</strong></small></div>
                </>
                :
                <small>Sent <strong>{moment(props.campaign.sent_at).format('lll')}</strong></small>
              }
            </div>
            <div className="campaign-detail-header-actions">
              <Button color="primary" href={`/campaigns/${props.campaign.id}/preview`}>Preview</Button>
              <Button color="secondary" outline href={`/campaigns`}>Back to campaigns</Button>
            </div>
          </div>
          <div className="main">
            <Row className="campaign-detail-row align-items-start">
              <Col md="3" sm="12">
                <div className="campaign-field-label">Segment</div>
              </Col>
              <Col md="6" sm="12">
                <div style={{ display: dropdownDisplay ? "none" : "block", lineHeight: 1.5 }}>{props.campaign.segment.name}</div>
                <Form style={{ display: dropdownDisplay ? "block" : "none" }}>
                  <FormGroup>
                    <Label for="segment">Select a segment</Label>
                    <Input type="select" name="segment_id" id="segment" onChange={dropDownHandler}>
                      <option></option>
                      <option value="create">Create a new segment</option>
                      {genSegmentOptions()}
                    </Input>
                    <Label for="segmentForm" style={{ display: segmentForm ? "block" : "none", marginTop: "10px" }}>Enter segment name</Label>
                    <Input type="text" style={{ display: segmentForm ? "block" : "none" }} id="segmentForm" value={segmentName} onChange={e => setSegmentName(e.target.value)} />
                    <Button color="primary" size="sm" style={{ display: segmentForm ? "inline" : "none", marginTop: "10px" }} onClick={createSegment}>Create</Button>
                    <Button color="secondary" size="sm" style={{ display: dropdownDisplay ? "inline" : "none", marginTop: "10px", marginLeft: segmentForm ? "10px" : "0px" }} onClick={() => { setDropdownDisplay(false); setSegmentForm(false) }}>Cancel</Button>
                  </FormGroup>
                </Form>
              </Col>
              <Col md="3" sm="12" className="text-md-right mt-2 mt-md-0">
                {props.campaign.status === "draft" ? <Button size="sm" color="link" className="p-0" style={{ display: dropdownDisplay ? "none" : "inline-block" }} onClick={() => setDropdownDisplay(true)}>Change</Button> : null}
              </Col>
            </Row>
            <Row className="campaign-detail-row align-items-start">
              <Col md="3" sm="12">
                <div className="campaign-field-label">From</div>
              </Col>
              <Col md="6" sm="12">
                <Form style={{ display: fromForm ? "block" : "none" }}>
                  <FormGroup style={{ maxWidth: "360px" }}>
                    <Input type="text" value={from} onChange={e => setFrom(e.target.value)} />
                    <div style={{ marginTop: "10px" }}>
                      <Button color="primary" size="sm" onClick={fromFormHandler}>Save</Button>
                      <Button color="secondary" size="sm" style={{ marginLeft: "8px" }} onClick={() => setFromForm(false)}>Cancel</Button>
                    </div>
                  </FormGroup>
                </Form>
                <div style={{ display: fromForm ? "none" : "block", lineHeight: 1.5 }}>{props.campaign.from}</div>
              </Col>
              <Col md="3" sm="12" className="text-md-right mt-2 mt-md-0">
                {props.campaign.status === "draft" ? <Button size="sm" color="link" className="p-0" onClick={() => setFromForm(true)} style={{ display: fromForm ? "none" : "inline-block" }}>Change</Button> : null}
              </Col>
            </Row>
            <Row className="campaign-detail-row align-items-start">
              <Col md="3" sm="12">
                <div className="campaign-field-label">Subject</div>
              </Col>
              <Col md="6" sm="12">
                <Form style={{ display: subjectForm ? "block" : "none" }} onSubmit={subjectFormHandler}>
                  <FormGroup style={{ maxWidth: "480px" }}>
                    <Input type="text" value={subject} onChange={e => setSubject(e.target.value)} />
                    <div style={{ marginTop: "10px" }}>
                      <Button color="primary" size="sm" type="submit">Save</Button>
                      <Button color="secondary" size="sm" style={{ marginLeft: "8px" }} type="button" onClick={() => setSubjectForm(false)}>Cancel</Button>
                    </div>
                  </FormGroup>
                </Form>
                <div style={{ display: subjectForm ? "none" : "block", lineHeight: 1.5 }}>{props.campaign.subject}</div>
              </Col>
              <Col md="3" sm="12" className="text-md-right mt-2 mt-md-0">
                {props.campaign.status === "draft" ? <Button size="sm" color="link" className="p-0" style={{ display: subjectForm ? "none" : "inline-block" }} onClick={() => setSubjectForm(true)}>Change</Button> : null}
              </Col>
            </Row>
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
