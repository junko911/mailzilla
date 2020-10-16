import React from 'react'
import { Row, Col, Card, CardText, CardTitle } from 'reactstrap'

const Stats = ({campaign}) => {
  return (
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
  )
}

export default Stats
