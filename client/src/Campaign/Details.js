import React, { useState } from 'react'
import { Button, Badge, Col, Row, Form, Input, FormGroup } from 'reactstrap'
import moment from 'moment'
import Stats from './Stats'
import { updateCampaign } from "../redux/actions";
import { connect } from "react-redux"

const Details = props => {

  const [formDisplay, setFormDisplay] = useState(false)
  const [campaignName, setCampaignName] = useState(props.campaign.name)

  const toggleEditForm = () => {
    setFormDisplay(!formDisplay)
  }

  const changeHandler = e => {
    setCampaignName(e.target.value)
  }

  const editHandler = e => {
    e.preventDefault()
    props.editHandler(props.campaign.id, "name", campaignName).then(data=>{
      toggleEditForm()
    })
  }

  const editForm = formDisplay ? "block" : "none"
  const editFormBtn = formDisplay ? "none" : "block"

  return (
    <>
      {props.campaign ?
        <>
          <div className="title">
            <h1 style={{ display: editFormBtn }}>{props.campaign.name} <Badge pill>{props.campaign.status[0].toUpperCase() + props.campaign.status.slice(1)}</Badge></h1>
            {props.campaign.status === "draft" ?
              <>
                <Form onSubmit={editHandler}>
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
                  <h4 style={{ display: "inline" }}>&nbsp;&nbsp;Segment</h4></Col>
                <Col xs="8">
                  <div>{props.campaign.segment.name}</div>
                </Col>
              </Row>
              <Row style={{ borderBottom: "1px solid #dedddc" }}>
                <Col xs="4">
                  <h4 style={{ display: "inline" }}>&nbsp;&nbsp;From</h4></Col>
                <Col xs="8">
                  <div>{props.campaign.from}</div>
                </Col>
              </Row>
              <Row>
                <Col xs="4">
                  <h4 style={{ display: "inline" }}>&nbsp;&nbsp;Subject</h4></Col>
                <Col xs="8">
                  <div>{props.campaign.subject}</div>
                </Col>
              </Row>
              {/* <Row>
                <Col xs="4"><Badge color="success" pill><i class="fas fa-check"></i></Badge><h4 style={{ display: "inline" }}>&nbsp;&nbsp;Content</h4></Col>
                <Col xs="8">
                  <div>Content</div>
                </Col>
              </Row> */}
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

const mdp = dispatch => {
  return { editHandler: (id, field, value) => dispatch(updateCampaign(id, field, value)) }
}

export default connect(null, mdp)(Details)
