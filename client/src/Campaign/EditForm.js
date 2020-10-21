import React from "react"
import { Row, Col, Button, Form, FormGroup } from "reactstrap"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateCampaign } from "../redux/actions"
import CKEditor from "ckeditor4-react"

class EditForm extends React.Component {
  state = {
    content: this.props.campaign.content
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
      filebrowserImageUploadUrl: `http://localhost:3000/api/v1/campaigns/${this.props.campaign.id}/upload`,
    }

    CKEditor.editorUrl = "https://cdn.ckeditor.com/4.15.0/full/ckeditor.js"

    return (
      <>
        <h1 className="title">{this.props.campaign.name}</h1>
        <p style={{ marginBottom: "0" }}><small>*Use <i>{"{{name}}"}</i> markup to personalize email per contact</small></p>
        <p><small>*Use <i>{"{{unsubscribe}}"}</i> markup to allow user to unsubscribe from your campaigns</small></p>
        <Form onSubmit={this.submitHandler}>
          <Row>
            <Col>
              <FormGroup>
                <CKEditor
                  data={this.props.campaign.content}
                  config={editorConfiguration}
                  onChange={e => {
                    this.setState({
                      content: e.editor.getData(),
                    })
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="3">
              <Button color="success" className="redirect-btn">Save</Button>
            </Col>
            <Col xs="3">
              <Button color="primary" className="redirect-btn" href={`/campaigns/${this.props.campaign.id}/preview`}>Preview</Button>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}

const mdp = dispatch => {
  return { submitHandler: (id, field, value) => dispatch(updateCampaign(id, field, value)) }
}

export default withRouter(connect(null, mdp)(EditForm))
