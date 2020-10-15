import React from "react";
import { Row, Col, Button, Form, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateCampaign } from "../redux/actions";
import CKEditor from "ckeditor4-react";

class EditForm extends React.Component {
  state = {
    content: ""
  };

  submitHandler = (e) => {
    e.preventDefault();
    const id = this.props.campaign.id;
    this.props.submitHandler(id, this.state.content).then(() => {
      this.props.history.push(`/campaigns/${id}`);
    });
  };

  render() {
    const editorConfiguration = {
      alignment: {
        options: ["left", "right"],
      },
      toolbar: "Basic",
      filebrowserImageUploadUrl: `http://localhost:3000/api/v1/campaigns/${this.props.campaign.id}/upload`,
    };

    CKEditor.editorUrl = "https://cdn.ckeditor.com/4.15.0/full/ckeditor.js";

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
                <CKEditor
                  data={this.props.campaign.content}
                  config={editorConfiguration}
                  onChange={(event) => {
                    this.setState({
                      content: event.editor.getData(),
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs="3">
              <Button color="primary" className="redirect-btn">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

const msp = (state) => {
  return { redirectTo: state.redirectTo };
};

const mdp = (dispatch) => {
  return {
    submitHandler: (id, content) => dispatch(updateCampaign(id, content)),
  };
};

export default withRouter(connect(msp, mdp)(EditForm));
