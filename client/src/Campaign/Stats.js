import React from 'react'
import { Row, Col, Card, CardText, CardTitle } from 'reactstrap'
import StatsTable from './StatsTable'
import StatsChart from './StatsChart'

const Stats = ({ campaign }) => {
  return (
    <div className="stats" style={{ marginTop: "30px" }}>
      <h2 className="title">Stats</h2>
      <div style={{ marginBottom: "50px" }}>
        <Row>
          <Col xs="2">
            <Card className="text-center stats-card">
              <CardTitle>Sent</CardTitle>
              <CardText className="stats-rate" style={{ fontSize: "23px", paddingTop: "10px", color: "#264653" }}>{campaign.sent}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center stats-card">
              <CardTitle>Delivered</CardTitle>
              <CardText className="stats-rate" style={{ color: "#2a9d8f", margin: "0", fontSize: "23px" }}>{campaign.delivered_rate * 100}%</CardText>
              <CardText className="stats-num" style={{ color: "#2a9d8f", fontSize: "15px", margin: "0" }}>{campaign.delivered}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center stats-card">
              <CardTitle>Opened</CardTitle>
              <CardText className="stats-rate" style={{ color: "#67b7dc", margin: "0", fontSize: "23px" }}>{campaign.open_rate * 100}%</CardText>
              <CardText className="stats-num" style={{ color: "#67b7dc", fontSize: "15px", margin: "0" }}>{campaign.open}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center stats-card">
              <CardTitle>Clicked</CardTitle>
              <CardText className="stats-rate" style={{ color: "#6794dc", margin: "0", fontSize: "23px" }}>{campaign.click_rate * 100}%</CardText>
              <CardText className="stats-num" style={{ color: "#6794dc", fontSize: "15px", margin: "0" }}>{campaign.click}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center stats-card">
              <CardTitle>Bounces</CardTitle>
              <CardText className="stats-rate" style={{ color: "#f4a261", margin: "0", fontSize: "23px" }}>{campaign.bounce_rate * 100}%</CardText>
              <CardText className="stats-num" style={{ color: "#f4a261", fontSize: "15px", margin: "0" }}>{campaign.bounce}</CardText>
            </Card>
          </Col>
          <Col xs="2">
            <Card className="text-center stats-card">
              <CardTitle>Spam reports</CardTitle>
              <CardText className="stats-rate" style={{ color: "#e76f51", margin: "0", fontSize: "23px" }}>{campaign.spamreport_rate * 100}%</CardText>
              <CardText className="stats-num" style={{ color: "#e76f51", fontSize: "15px", margin: "0" }}>{campaign.spamreport}</CardText>
            </Card>
          </Col>
        </Row>
      </div>
      <StatsChart campaign={campaign} />
      <h2 className="title">Stats by contacts</h2>
      <StatsTable campaign={campaign} />
    </div>
  )
}

export default Stats
