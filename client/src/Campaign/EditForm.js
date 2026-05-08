import React from "react"
import API_URL from "../config"
import { Button, Form, FormGroup } from "reactstrap"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateCampaign } from "../redux/actions"
import CKEditor from "ckeditor4-react"

class EditForm extends React.Component {
  state = {
    content: this.props.campaign ? this.props.campaign.content : ""
  }

  submitHandler = e => {
    e.preventDefault()
    const id = this.props.campaign.id
    this.props.submitHandler(id, "content", this.state.content).then(() => {
      this.props.history.push(`/campaigns/${id}/preview`)
    })
  }

  render() {
    const editorConfiguration = {
      allowedContent: true,
      height: 700,
      toolbar: [
        { name: 'document', items: ['Source'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'Undo', 'Redo'] },
        { name: 'editing', items: ['SelectAll'] },
        '/',
        '/',
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
        { name: 'links', items: ['Link', 'Unlink'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley'] },
        '/',
        { name: 'styles', items: ['Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        '/',
        '/'
      ],
      filebrowserImageUploadUrl: `${API_URL}/api/v1/campaigns/${this.props.campaign.id}/upload`,
    }

    CKEditor.editorUrl = "https://cdn.ckeditor.com/4.22.1/full/ckeditor.js"

    const { campaign } = this.props
    if (!campaign) {
      return <div className="loader" />
    }

    return (
      <Form id="campaign-edit-form" onSubmit={this.submitHandler} className="edit-form">
        <div className="title campaign-detail-header">
          <div className="campaign-detail-header-text">
            <h1>{campaign.name}</h1>
            <p className="edit-page-subtitle">Compose and format your email below.</p>
          </div>
          <div className="campaign-detail-header-actions">
            <Button color="success" type="submit">
              Save
            </Button>
            <Button color="secondary" outline href={`/campaigns/${campaign.id}/preview`}>
              Back to preview
            </Button>
          </div>
        </div>

        <div className="edit-hints" role="note">
          <ul>
            <li>
              Use <code>{"{{name}}"}</code> to personalize with each contact&apos;s name.
            </li>
            <li>
              Use <code>{"{{unsubscribe}}"}</code> so recipients can opt out of campaigns.
            </li>
          </ul>
        </div>

        <div className="main edit-page-card">
          <div className="campaign-field-label">Email body</div>
          <FormGroup className="edit-form-editor-wrap mb-0">
            <CKEditor
              data={campaign.content}
              config={editorConfiguration}
              onChange={e => {
                this.setState({
                  content: e.editor.getData(),
                })
              }}
            />
          </FormGroup>
        </div>
      </Form>
    )
  }
}

const mdp = dispatch => {
  return { submitHandler: (id, field, value) => dispatch(updateCampaign(id, field, value)) }
}

export default withRouter(connect(null, mdp)(EditForm))
