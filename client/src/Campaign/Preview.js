import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { sendToSegment } from '../redux/actions'

const Preview = props => {
  let foundCampaign = props.campaigns.find(campaign => campaign.id === props.id)

  const sendTest = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }
    }
    fetch(`http://localhost:3000/api/v1/campaigns/${props.id}/send_test`, options)
      .then(() => {
        props.history.push(`/campaigns/${props.id}`)
      })
  }

  return (
    <>
      {
        foundCampaign ?
          <>
            <h1>Preview</h1>
            <>
              <h4>Subject: {foundCampaign.subject}</h4>
              <Row>
                <Col xs="9">
                  {
                    foundCampaign.content ?
                      <div
                        dangerouslySetInnerHTML={{ __html: foundCampaign.content }}
                        style={{ border: "1px solid #ced4da", minHeight: "500px" }}
                      ></div>
                      : <div style={{ border: "1px solid #ced4da", minHeight: "500px" }}>No content</div>
                  }
                </Col>
                <Col xs="3">
                  <div>
                    <Button
                      color="secondary"
                      className="redirect-btn"
                      href={`/campaigns`}
                    >Go back to campaigns</Button>
                    <Button
                      color="success"
                      className="redirect-btn"
                      href={`/campaigns/${foundCampaign.id}/edit`}
                    >Edit</Button>
                    <Button
                      color="primary"
                      onClick={sendTest}
                      className="redirect-btn"
                    >Send test to myself</Button>
                    <Button
                      color="danger"
                      className="redirect-btn"
                      onClick={() => props.sendToSegment(props.id)}
                    >Send to segment</Button>
                  </div>
                </Col>
              </Row>
            </>
          </>
          : null
      }
    </>
  )
}

const msp = state => {
  return { campaigns: state.campaigns }
}

const mdp = dispatch => {
  return { sendToSegment: campaignId => dispatch(sendToSegment(campaignId)) }
}

export default withRouter(connect(msp, mdp)(Preview))
