import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import Segments from './Segments'
import moment from 'moment'

const Details = ({ contact }) => {
  return (
    <>
      {contact ?
        <>
          <div className="title">
            <h1>{contact.name}</h1>
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
                    <Col xs="8">
                      <div>{contact.email}</div>
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
