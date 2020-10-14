import React from 'react'
import { FormGroup, Input, ModalBody, Button, Label } from 'reactstrap'

const SegmentForm = props => {

  const genOptions = () => {
    return props.segments.map(segment => {
      return (
        <Button
          key={segment.id}
          outline
          color="primary"
          size="sm"
          onClick={()=>props.changeSearchTerm(segment.name)}
        >
          + {segment.name}
        </Button>
      )
    })
  }

  return (
    <ModalBody>
      <FormGroup>
        <Label for="segmentName">Create a new segment: </Label>
        <Input
          type="search"
          name="segment"
          placeholder="Segment name"
          list="segments"
          autoComplete="off"
          id="segmentName"
          onChange={e => props.changeSearchTerm(e.target.value)}
          value={props.searchTerm}
        />
        <div>Or</div>
        <div>Choose one from existing segments:</div>
        {genOptions()}
      </FormGroup>
    </ModalBody>
  )
}

export default SegmentForm
