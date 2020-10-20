import React from 'react'
import { Button, Badge } from 'reactstrap'
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
            <h4>Segment: {campaign.segment.name}</h4>
            <h4>Subject: {campaign.subject}</h4>
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
