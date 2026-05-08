import React, { useState } from "react"
import API_URL from "../config"
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, Alert } from "reactstrap"
import { sendToSegment } from "../redux/actions"

const Preview = props => {
  let foundCampaign = props.campaigns ? props.campaigns.find(campaign => campaign.id === props.id) : null

  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)

  const [alert, setAlert] = useState(false)
  const toggleAlert = () => setAlert(!alert)

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
      `${API_URL}/api/v1/campaigns/${props.id}/send_test`, options)
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
          <div className="title campaign-detail-header">
            <div className="campaign-detail-header-text">
              <h1>Preview</h1>
              <p className="preview-subject-line">
                <span className="preview-subject-label">Subject</span>
                <span className="preview-subject-value">{foundCampaign.subject || "—"}</span>
              </p>
            </div>
            <div className="campaign-detail-header-actions">
              {foundCampaign.status === "draft" ? (
                <>
                  <Button color="success" href={`/campaigns/${foundCampaign.id}/edit`}>
                    Edit
                  </Button>
                  <Button color="primary" onClick={sendTest}>
                    Send test to myself
                  </Button>
                  <Button color="danger" onClick={toggleModal}>
                    Send to segment
                  </Button>
                </>
              ) : null}
              <Button color="secondary" outline href={`/campaigns/${props.id}`}>
                Back to campaign details
              </Button>
            </div>
          </div>
          {alert ? (
            <Alert color="success" className="preview-sent-alert" toggle={toggleAlert}>
              The campaign has been sent!
            </Alert>
          ) : null}
          <div className="main preview-page-card">
            <div className="campaign-field-label">Email preview</div>
            <div className="preview-email-shell">
              {foundCampaign.content ? (
                <div
                  className="preview-email-body"
                  dangerouslySetInnerHTML={{ __html: foundCampaign.content }}
                />
              ) : (
                <div className="preview-email-body preview-email-body--empty">
                  No content yet. Use <strong>Edit</strong> to add your message.
                </div>
              )}
            </div>
          </div>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalBody>
              <h4 className="mb-3">Are you sure?</h4>
              <p className="mb-0">
                You are going to send this campaign to {foundCampaign.num_of_contacts} contacts.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" size="sm" onClick={sendToSegment}>
                Yes
              </Button>
              <Button color="secondary" size="sm" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
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
