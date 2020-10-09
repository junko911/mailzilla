import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Segments = props => {
  console.log(props.segments)

  const genSegmentButton = () => {
    return props.segments.map(segment => {
      return <Button key={segment.id} outline color="secondary">x {segment.name}</Button>
    })
  }

  return (
    <>
      <h1>Segments</h1>
      {genSegmentButton()}
    </>
  )
}

export default Segments
