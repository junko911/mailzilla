import React from 'react'
import { FormGroup, Input, ModalBody, Button } from 'reactstrap'

const SegmentForm = props => {

  const genOptions = () => {
    return props.segments.map(segment => {
      return (
        <Button
          key={segment.id}
          outline
          color="primary"
          size="sm"
          onClick={() => props.changeSearchTerm(segment.name)}
        >
          + {segment.name}
        </Button>
      )
    })
  }

  return (
    <ModalBody>
      <FormGroup>
        <div style={{ fontSize: "25px" }}>Create a new segment</div>
        <Input
          type="search"
          name="segment"
          placeholder="Segment name"
          list="segments"
          autoComplete="off"
          onChange={e => props.changeSearchTerm(e.target.value)}
          value={props.searchTerm}
        />
        <div>Or</div>
        <div style={{ fontSize: "25px" }}>Choose one from existing segments:</div>
        {genOptions().length > 0 ?
          genOptions()
          :
          <div>No segments found. Please create a new one.</div>
        }
      </FormGroup>
    </ModalBody>
  )
}

export default SegmentForm
