import React from 'react'
import { Row, Col, Card, CardText, CardTitle } from 'reactstrap'
import StatsTable from './StatsTable'

const Stats = ({ campaign }) => {
  return (
    <div className="stats">
      <h1>Statistics:</h1>
      <div style={{ marginBottom: "50px" }}>
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
      <StatsTable campaign={campaign} />
    </div>
  )
}

export default Stats
