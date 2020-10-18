import React from 'react'
import { Row, Col, Card, CardText, CardTitle } from 'reactstrap'
import StatsTable from './StatsTable'
import StatsChart from './StatsChart'

const Stats = ({ campaign }) => {
  return (
    <div className="stats">
      <h1>Statistics:</h1>
      <div style={{ marginBottom: "50px" }}>
        <Row>
          <Col xs="2">
            <Card className="text-center">
              <CardTitle style={{ color: "#264653" }}>Sent</CardTitle>
              <CardText>{campaign.sent}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center">
              <CardTitle>Delivered</CardTitle>
              <CardText style={{ color: "#2a9d8f" }}>{campaign.delivered}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center">
              <CardTitle>Opened</CardTitle>
              <CardText style={{ color: "#67b7dc" }}>{campaign.open}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center">
              <CardTitle>Clicked</CardTitle>
              <CardText style={{ color: "#6794dc" }}>{campaign.click * 100}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center">
              <CardTitle>Bounces</CardTitle>
              <CardText style={{ color: "#f4a261" }}>{campaign.bounce}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center">
              <CardTitle>Spam reports</CardTitle>
              <CardText style={{ color: "#e76f51" }}>{campaign.spamreport}</CardText>
            </Card>
          </Col>
        </Row>
      </div>
      <StatsChart campaign={campaign} />
      <StatsTable campaign={campaign} />
    </div>
  )
}

export default Stats
