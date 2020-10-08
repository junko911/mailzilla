import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { createCampaign } from '../redux/actions'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class LayoutForm extends React.Component {

  constructor(props) {
    super(props);
    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
        name: "",
        subject: "",
        content: ""
      };
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.submitHandler(this.state)
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <>
        <h1>Create New Campaign</h1>
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="campaign-name" value={this.state.name} onChange={this.changeHandler} />
          </FormGroup>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input type="text" name="subject" id="campaign-subject" value={this.state.subject} onChange={this.changeHandler} />
          </FormGroup>
          {/* <FormGroup>
            <Label for="to">To</Label>
            <Input type="email" name="to" id="campaign-to" placeholder="example@example.com" value={this.state.to} onChange={this.changeHandler} />
          </FormGroup> */}
          <FormGroup>
            <Label for="content">Content</Label>
            <Input type="textarea" name="content" id="campaign-content" value={this.state.content} onChange={this.changeHandler} />
          </FormGroup>
          <div>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
            <textarea
              disabled
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
          </div>
          <Button color="primary">Send Test to Myself</Button>
        </Form>
      </>
    )
  }
}

const mdp = dispatch => {
  return { submitHandler: campaignObj => dispatch(createCampaign(campaignObj)) }
}

export default connect(null, mdp)(LayoutForm)
