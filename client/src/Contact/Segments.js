import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, Form, } from 'reactstrap'
import SegmentForm from './SegmentForm'
import { updateContact } from '../redux/actions'
import { connect } from 'react-redux'

const Segments = props => {
  const [modal, setModal] = useState(false)
  const [searchTerm, changeSearchTerm] = useState("")

  const toggle = () => setModal(!modal)

  const genSegmentButton = () => {
    return props.contact.segments.map(segment => {
      return <Button key={segment.id} outline color="secondary">x {segment.name}</Button>
    })
  }

  const submitHandler = e => {
    e.preventDefault()
    props.updateContact(props.contact.id, { name: searchTerm }).then(() => {
      toggle()
    })
  }

  return (
    <>
      <h1>Segments</h1>
      <Button color="primary" onClick={toggle}>+</Button>
      {genSegmentButton()}
      <Modal isOpen={modal} toggle={toggle}>
        <Form onSubmit={submitHandler}>
          <ModalHeader toggle={toggle}>Find or Create Segment</ModalHeader>
          <SegmentForm changeSearchTerm={changeSearchTerm} />
          <ModalFooter>
            {/* <Button color="primary" onClick={toggle}>Do Something</Button> */}
            <Button color="primary">Create</Button>
            {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
          </ModalFooter>
        </Form>
      </Modal>

    </>
  )
}

const mdp = dispatch => {
  return { updateContact: (contactId, segmentObj) => dispatch(updateContact(contactId, segmentObj)) }
}

export default connect(null, mdp)(Segments)
