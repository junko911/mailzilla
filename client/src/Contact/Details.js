import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import Segments from './Segments'
import moment from 'moment'

const Details = ({ contact }) => {

  // const editForm = formDisplay ? "block" : "none"
  // const editFormBtn = formDisplay ? "none" : "block"

  return (
    <>
      {contact ?
        <>
          <div className="title">
            <h1>{contact.name}</h1>
            {/* <Form onSubmit={editHandler}>
              <FormGroup style={{ display: editForm, width: "300px" }}>
                <Input type="text" value={campaignName} onChange={changeHandler} />
                <Button color="primary" size="sm" style={{ width: "100px", float: "none", marginTop: "10px" }}>Save</Button>
                <span className="edit" style={{ textDecoration: "underline", marginLeft: "20px" }} onClick={toggleEditForm}>Cancel</span>
              </FormGroup>
            </Form> */}
            {/* <span className="edit" style={{ display: editFormBtn }} onClick={toggleEditForm}>Edit name</span> */}
            <span className="edit" style={{ display: "block" }}>Edit name</span>
            <small>Created <strong>{moment(contact.created_at).format('lll')}</strong></small>
            <Button
              color="secondary"
              href={`/contacts`}
            >
              Go back to contacts
              </Button>
          </div>
          <Row>
            <Col xs="8">
              <div className="main">
                <div style={{ margin: "0 20px", lineHeight: "45px" }}>
                  <Row>
                    <Col xs="4">
                      <h4 style={{ display: "inline" }}>Email</h4>
                    </Col>
                    <Col xs="6">
                      <div>{contact.email}</div>
                    </Col>
                    <Col xs="2">
                      <Button color="secondary">Edit</Button>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col xs="4">
                      <h4 style={{ display: "inline" }}>Segment</h4>
                    </Col>
                    <Col xs="8">
                      <div>{contact.email}</div>
                    </Col>
                  </Row> */}
                </div>
              </div>
            </Col>
            <Col xs="4">
              <div className="main" style={{ paddingTop: "15px" }}>
                <Segments contact={contact} />
              </div>
            </Col>
          </Row>
        </>
        : null}
    </>
  )
}

export default Details
