import React from 'react'
import { Row, Col, Card, CardText, CardTitle, Button } from 'reactstrap'
import moment from 'moment'

const Details = ({ campaign }) => {

  return (
    <>
      {campaign ?
        <>
          <h1>Campaign Details</h1>
          <Row>
            <Col xs="9">
              <h4>Name: {campaign.name}</h4>
              <h4>Segment: {campaign.segment.name}</h4>
              <h4>Status: {campaign.status[0].toUpperCase() + campaign.status.slice(1)}</h4>
              <h4>Created at: {moment(campaign.created_at).calendar()}</h4>
            </Col>
            <Col xs="3">
              <Button
                color="primary"
                className="redirect-btn"
                href={`/campaigns/${campaign.id}/preview`}
              >
                Preview
              </Button>
              <Button
                color="secondary"
                className="redirect-btn"
                href={`/campaigns`}
              >
                Go back to campaigns
              </Button>
            </Col>
          </Row>
          {campaign.status === "sent" ?
            <div className="stats">
              <h1>Statistics:</h1>
              <Row>
                <Col xs="3">
                  <Card className="text-center">
                    <CardTitle>Sent</CardTitle>
                    <CardText>{campaign.sent}</CardText>
                  </Card>
                </Col>
                <Col xs="3">
                  <Card className="text-center">
                    <CardTitle>Delivered</CardTitle>
                    <CardText>{campaign.delivered}</CardText>
                  </Card>
                </Col>
                <Col xs="3">
                  <Card className="text-center">
                    <CardTitle>Open</CardTitle>
                    <CardText>{campaign.open}</CardText>
                  </Card>
                </Col>
                <Col xs="3">
                  <Card className="text-center">
                    <CardTitle>Open rate</CardTitle>
                    <CardText>{campaign.open_rate * 100}%</CardText>
                  </Card>
                </Col>
              </Row>
            </div>
            : null
          }
        </>
        : null}
    </>
  )
}

export default Details
