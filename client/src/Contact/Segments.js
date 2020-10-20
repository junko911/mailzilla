import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, Form, } from 'reactstrap'
import SegmentForm from './SegmentForm'
import { addSegment, removeSegment } from '../redux/actions'
import { connect } from 'react-redux'

const Segments = props => {
  const [modal, setModal] = useState(false)
  const [searchTerm, changeSearchTerm] = useState("")

  const toggle = () => setModal(!modal)

  const genSegmentButton = () => {
    return props.contact.segments.map(segment => {
      return <Button key={segment.id} outline color="secondary" onClick={() => props.removeSegment(props.contact.id, segment.id)}>x {segment.name}</Button>
    })
  }

  const submitHandler = e => {
    e.preventDefault()
    props.addSegment(props.contact.id, { name: searchTerm }).then(() => {
      changeSearchTerm("")
      toggle()
    })
  }

  const filteredSegments = () => {
    return props.currentUser.segments.filter(segment => !props.contact.segments.map(e => e.id).includes(segment.id))
  }

  return (
    <>
      {props.currentUser ?
        <>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ display: "inline" }}>Segments</h2>
            <Button
              color="primary"
              onClick={toggle}
              style={{
                minWidth: "30px",
                minHeight: "30px",
                padding: "0",
                float: "right",
              }}
            >+</Button>
          </div>
          {genSegmentButton()}
          <Modal isOpen={modal} toggle={toggle}>
            <Form onSubmit={submitHandler}>
              <ModalHeader toggle={toggle}>Add segment to contact</ModalHeader>
              <SegmentForm segments={filteredSegments()} searchTerm={searchTerm} changeSearchTerm={changeSearchTerm} />
              <ModalFooter>
                <Button color="primary">Add</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </>
        :
        null
      }
    </>
  )
}

const msp = state => {
  return { currentUser: state.currentUser }
}

const mdp = dispatch => {
  return {
    addSegment: (contactId, segmentObj) => dispatch(addSegment(contactId, segmentObj)),
    removeSegment: (contactId, segmentId) => dispatch(removeSegment(contactId, segmentId))
  }
}

export default connect(msp, mdp)(Segments)
