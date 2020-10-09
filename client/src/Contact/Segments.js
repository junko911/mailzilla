import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import SegmentForm from './SegmentForm'

const Segments = props => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const genSegmentButton = () => {
    return props.segments.map(segment => {
      return <Button key={segment.id} outline color="secondary">x {segment.name}</Button>
    })
  }

  return (
    <>
      <h1>Segments</h1>
      <Button color="primary" onClick={toggle}>+</Button>
      {genSegmentButton()}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Find or Create Segment</ModalHeader>
        <ModalBody>
          <SegmentForm />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Segments
