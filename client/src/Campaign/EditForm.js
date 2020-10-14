import React from 'react'
import { Row, Col, Button, Form, FormGroup } from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCampaign } from '../redux/actions'

class EditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: null,
      content: ""
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    }, () => {
      this.setState({ content: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
    });
  };

  submitHandler = e => {
    e.preventDefault()
    const id = this.props.campaign.id
    this.props.submitHandler(id, this.state.content).then(() => {
      this.props.history.push(`/campaigns/${id}`)
    })
  }

  componentDidMount() {
    const contentBlock = htmlToDraft(this.props.campaign.content)
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    const editorState = EditorState.createWithContent(contentState)
    this.setState({ editorState, content: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
  }

  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        const fd = new FormData()
        const token = localStorage.getItem("token")
        xhr.open("POST", `http://localhost:3000/api/v1/campaigns/${this.props.campaign.id}/upload`)
        xhr.setRequestHeader("Authorization", `Bearer ${token}`)
        fd.append('file', file)
        xhr.send(fd)
        xhr.addEventListener('load', (data) => {
          const response = JSON.parse(data.target.response)
          resolve(response)
        })
      }
    )
  }

  render() {
    return (
      <>
        <h4>Campaign: {this.props.campaign.name}</h4>
        <h4>Subject: {this.props.campaign.subject}</h4>
        <h4>Segment: {this.props.campaign.segment.name}</h4>
        <h4>Content</h4>
        <Form onSubmit={this.submitHandler}>
          <Row>
            <Col xs="9">
              <FormGroup>
                <div style={{ minHeight: "500px", border: "1px solid #ced4da" }}>
                  <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                      image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true }, previewImage: true }
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col xs="3">
              <Button color="primary" className="redirect-btn" >Save</Button>
            </Col>
          </Row>
        </Form>
      </>
    )

  }
}

const msp = state => {
  return { redirectTo: state.redirectTo }
}

const mdp = dispatch => {
  return { submitHandler: (id, content) => dispatch(updateCampaign(id, content)) }
}

export default withRouter(connect(msp, mdp)(EditForm))
