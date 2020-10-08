import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCampaign } from '../redux/actions'

class HTMLForm extends React.Component {

  constructor(props) {
    super(props);
    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
        content: html
      };
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
    this.props.
    (this.state.content)
  }

  render() {
    const { editorState } = this.state;

    return (
      <>
        <h1>Content</h1>
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <div style={{ minHeight: "500px", border: "1px solid #ced4da" }}>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </FormGroup>
          <Button color="primary">Preview</Button>
        </Form>
      </>
    )
  }
}

const msp = state => {
  return { campaigns: state.campaigns }
}

const mdp = dispatch => {
  return { submitHandler: content => dispatch(updateCampaign(content)) }
}

export default withRouter(connect(msp, mdp)(HTMLForm))
