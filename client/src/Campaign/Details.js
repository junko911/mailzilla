import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import moment from 'moment'
import Stats from './Stats'

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
            <Stats campaign={campaign} />
            : null
          }
        </>
        : null}
    </>
  )
}

export default Details
