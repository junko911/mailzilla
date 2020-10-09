import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'

const Preview = props => {
  let foundCampaign = props.campaigns.find(campaign => campaign.id === props.id)

  const clickHandler = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        campaign: foundCampaign
      })
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
            {
              foundCampaign.content ?
                <>
                  <h1>Preview</h1>
                  <h4>Subject: {foundCampaign.subject}</h4>
                  <Row>
                    <Col xs="8">
                      <div
                        dangerouslySetInnerHTML={{ __html: foundCampaign.content }}
                        style={{ border: "1px solid #ced4da", minHeight: "500px" }}
                      ></div>
                    </Col>
                    <Col xs="4">
                      <div>
                        <Button
                          color="secondary"
                          className="preview-btn"
                          style={{ display: "block" }}
                        >Edit</Button>
                        <Button
                          color="success"
                          onClick={clickHandler}
                          className="preview-btn"
                          style={{ display: "block" }}
                        >Send Test to Myself</Button>
                        <Button
                          color="primary"
                          className="preview-btn"
                          style={{ display: "block" }}
                        >Send to Segment</Button>
                      </div>
                    </Col>
                  </Row>
                </>
                : <div>No content</div>
            }
          </>
          : null
      }
    </>
  )
}

const msp = state => {
  return { campaigns: state.campaigns }
}

export default withRouter(connect(msp)(Preview))
