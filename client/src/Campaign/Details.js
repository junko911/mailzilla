import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import moment from 'moment'
import Stats from './Stats'

const Details = ({ campaign }) => {

  return (
    <>
      {campaign ?
        <>
          <div className="title">
            <h1>{campaign.name}</h1>
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
            <h4>Segment: {campaign.segment.name}</h4>
            <h4>Status: {campaign.status[0].toUpperCase() + campaign.status.slice(1)}</h4>
            <h4>Created at: {moment(campaign.created_at).format('lll')}</h4>
            {campaign.sent_at ? <h4>Sent at: {moment(campaign.sent_at).format('lll')}</h4> : null}
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
