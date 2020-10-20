import React from 'react'
import { Button, Badge, Col, Row } from 'reactstrap'
import moment from 'moment'
import Stats from './Stats'

const Details = ({ campaign }) => {

  return (
    <>
      {campaign ?
        <>
          <div className="title">
            <h1>{campaign.name} <Badge pill>{campaign.status[0].toUpperCase() + campaign.status.slice(1)}</Badge></h1>
            {campaign.status === "draft" ?
              <small>Created <strong>{moment(campaign.created_at).format('lll')}</strong></small>
              :
              <small>Sent <strong>{moment(campaign.sent_at).format('lll')}</strong></small>
            }
            <Button
              color="primary"
              style={{ marginRight: "220px" }}
              href={`/campaigns/${campaign.id}/preview`}
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
                  <Badge color="success" pill><i class="fas fa-check"></i></Badge>
                  <h4 style={{ display: "inline" }}>&nbsp;&nbsp;Segment</h4></Col>
                <Col xs="8">
                  <div>{campaign.segment.name}</div>
                </Col>
              </Row>
              <Row style={{ borderBottom: "1px solid #dedddc" }}>
                <Col xs="4"><Badge color="success" pill><i class="fas fa-check"></i></Badge><h4 style={{ display: "inline" }}>&nbsp;&nbsp;From</h4></Col>
                <Col xs="8">
                  <div>{campaign.from}</div>
                </Col>
              </Row>
              <Row style={{ borderBottom: "1px solid #dedddc" }}>
                <Col xs="4"><Badge color="success" pill><i class="fas fa-check"></i></Badge><h4 style={{ display: "inline" }}>&nbsp;&nbsp;Subject</h4></Col>
                <Col xs="8">
                  <div>{campaign.subject}</div>
                </Col>
              </Row>
              <Row>
                <Col xs="4"><Badge color="success" pill><i class="fas fa-check"></i></Badge><h4 style={{ display: "inline" }}>&nbsp;&nbsp;Content</h4></Col>
                <Col xs="8">
                  <div>Content</div>
                </Col>
              </Row>
            </div>
          </div>
          {campaign.status === "sent" ?
            <Stats campaign={campaign} />
            : null
          }
        </>
        : null}
    </>
  )
}

export default Details
