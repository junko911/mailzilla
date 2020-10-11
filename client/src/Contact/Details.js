import React from 'react'
import { Row, Col } from 'reactstrap'
import Segments from './Segments'
import moment  from 'moment'

const Details = ({ contact }) => {
  return (
    <>
      {contact ?
        <>
          <Row>
            <Col xs="8">
              <h1>Contact Details</h1>
              <h4>Name: {contact.name}</h4>
              <h4>Email: {contact.email}</h4>
              <h4>Created at: {moment(contact.created_at).calendar()}</h4>
            </Col>
            <Col xs="4">
              <Segments contact={contact} />
            </Col>
          </Row>
        </>
        : null}
    </>
  )
}

export default Details
