import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const SegmentForm = () => {
  return (
    <FormGroup>
      <Input
        type="search"
        name="segment"
        placeholder="Segment name"
      />
    </FormGroup>
  )
}

export default SegmentForm
