import React from 'react'
import { FormGroup, Input, ModalBody, } from 'reactstrap'

const SegmentForm = props => {

  return (
    <ModalBody>
      <FormGroup>
        <Input
          type="search"
          name="segment"
          placeholder="Segment name"
          onChange={e => props.changeSearchTerm(e.target.value)}
        />
      </FormGroup>
    </ModalBody>

  )
}

export default SegmentForm
