import React, { useState } from 'react'
import Preview from './Preview'
import { Alert, Row, Col } from 'reactstrap'
import moment from 'moment'

const Details = ({ campaign }) => {

  const [alert, setAlert] = useState(false)
  const toggle = () => setAlert(!alert)

  const alertDisplay = alert ? "block" : "none"

  return (
    <>
      {campaign ?
        <>
          <Alert color="success" style={{ display: alertDisplay }}>
            The campaign has been sent!
          </Alert>
          <h1>Campaign Details</h1>
          <Row>
            <Col xs="6">
              <h4>Name: {campaign.name}</h4>
              <h4>Segment: {campaign.segment.name}</h4>
              <h4>Status: {campaign.status[0].toUpperCase() + campaign.status.slice(1)}</h4>
              <h4>Created at: {moment(campaign.created_at).calendar()}</h4>
            </Col>
            <Col>
              <h4 xs="6">Stats:</h4>
              <p>Sent: {campaign.sent}</p>
              <p>Delivered: {campaign.delivered}</p>
              <p>Open: {campaign.open}</p>
              <p>Open rate: {campaign.open_rate * 100}%</p>
            </Col>
          </Row>
          <Preview id={campaign.id} toggleAlert={toggle} />
        </>
        : null}
    </>
  )
}

export default Details
