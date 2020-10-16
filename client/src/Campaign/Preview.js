import React, { useState } from "react"
import { connect } from "react-redux"
import { Row, Col, Button, Modal, ModalBody, ModalFooter, Alert } from "reactstrap"
import { sendToSegment } from "../redux/actions"

const Preview = props => {
  let foundCampaign = props.campaigns ? props.campaigns.find(campaign => campaign.id === props.id) : null

  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)

  const [alert, setAlert] = useState(false)
  const toggleAlert = () => setAlert(!alert)

  const alertDisplay = alert ? "block" : "none"

  const sendTest = () => {
    const token = localStorage.getItem("token")
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    fetch(
      `http://localhost:3000/api/v1/campaigns/${props.id}/send_test`, options)
      .then(() => {
        toggleAlert()
      })
  }

  const sendToSegment = () => {
    props.sendToSegment(props.id).then(() => {
      toggleModal()
      toggleAlert()
    })
  }

  return (
    <>
      {foundCampaign ? (
        <>
          <h1>Preview</h1>
          <Alert color="success" style={{ display: alertDisplay }}>
            The campaign has been sent!
          </Alert>
          <>
            <h4>Subject: {foundCampaign.subject}</h4>
            <Row>
              <Col xs="9">
                {foundCampaign.content ?
                  <div
                    dangerouslySetInnerHTML={{ __html: foundCampaign.content }}
                    style={{ border: "1px solid #ced4da", minHeight: "500px" }}
                  ></div>
                  :
                  <div style={{ border: "1px solid #ced4da", minHeight: "500px" }}>No content</div>
                }
              </Col>
              <Col xs="3">
                <div>
                  <Button
                    color="success"
                    className="redirect-btn"
                    href={`/campaigns/${foundCampaign.id}/edit`}
                  >
                    Edit
                  </Button>
                  <Button
                    color="primary"
                    onClick={sendTest}
                    className="redirect-btn"
                  >
                    Send test to myself
                  </Button>
                  <Button
                    color="danger"
                    className="redirect-btn"
                    onClick={toggleModal}
                  >
                    Send to segment
                  </Button>
                  <Button
                    color="secondary"
                    className="redirect-btn"
                    href={`/campaigns/${props.id}`}
                  >
                    Go back to campaign details
                  </Button>
                </div>
                <div>
                  <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalBody>
                      <h4>Are you sure?</h4>
                      <ModalFooter>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={sendToSegment}
                        >
                          Yes
                        </Button>
                        <Button color="secondary" size="sm" onClick={toggleModal}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalBody>
                  </Modal>
                </div>
              </Col>
            </Row>
          </>
        </>
      ) : null}
    </>
  )
}

const msp = state => {
  return { campaigns: state.campaigns }
}

const mdp = dispatch => {
  return { sendToSegment: campaignId => dispatch(sendToSegment(campaignId)) }
}

export default connect(msp, mdp)(Preview)
