import React, { useState } from "react"
import API_URL from "../config"
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, Alert, Input, Label } from "reactstrap"
import { sendToSegment } from "../redux/actions"

const Preview = props => {
  let foundCampaign = props.campaigns ? props.campaigns.find(campaign => campaign.id === props.id) : null

  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)

  const [successMessage, setSuccessMessage] = useState(null)
  const [testEmail, setTestEmail] = useState("")
  const [testError, setTestError] = useState(null)
  const [sendingTest, setSendingTest] = useState(false)

  const sendTest = () => {
    setTestError(null)
    const email = testEmail.trim()
    if (!email) {
      setTestError("Enter an email address")
      return
    }
    const token = localStorage.getItem("token")
    setSendingTest(true)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    }
    fetch(`${API_URL}/api/v1/campaigns/${props.id}/send_test`, options)
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          const msg = (data.errors && data.errors[0]) || "Could not send test email"
          setTestError(msg)
          return
        }
        setSuccessMessage(`Test email sent to ${email} via SendGrid.`)
      })
      .catch(() => {
        setTestError("Network error. Try again.")
      })
      .finally(() => {
        setSendingTest(false)
      })
  }

  const sendToSegment = () => {
    props.sendToSegment(props.id).then(() => {
      toggleModal()
      setSuccessMessage("The campaign has been sent!")
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
            <div className="campaign-detail-header-actions preview-header-actions">
              <div className="preview-toolbar">
                <div className="preview-toolbar-quick">
                  {foundCampaign.status === "draft" ? (
                    <>
                      <Button color="success" href={`/campaigns/${foundCampaign.id}/edit`}>
                        Edit
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
                {foundCampaign.status === "draft" ? (
                  <div className="preview-send-test-card">
                    <div className="preview-send-test-heading">
                      <span className="preview-send-test-title">Send test email</span>
                      <span className="preview-send-test-badge">SendGrid</span>
                    </div>
                    <div className="preview-send-test-row">
                      <Label for="send-test-email" className="sr-only">
                        Test recipient email
                      </Label>
                      <Input
                        id="send-test-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Recipient email"
                        value={testEmail}
                        onChange={e => {
                          setTestEmail(e.target.value)
                          if (testError) setTestError(null)
                        }}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            sendTest()
                          }
                        }}
                        className="preview-send-test-input"
                      />
                      <Button
                        color="primary"
                        onClick={sendTest}
                        disabled={sendingTest}
                        className="preview-send-test-submit"
                      >
                        {sendingTest ? "Sending…" : "Send"}
                      </Button>
                    </div>
                    {testError ? (
                      <p className="preview-send-test-error mb-0">{testError}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {successMessage ? (
            <Alert
              color="success"
              className="preview-sent-alert"
              toggle={() => setSuccessMessage(null)}
            >
              {successMessage}
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
