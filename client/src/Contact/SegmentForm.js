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
          style={{ marginRight: "5px", marginBottom: "5px" }}
        >
          + {segment.name}
        </Button>
      )
    })
  }

  return (
    <ModalBody>
      <FormGroup>
        <h4 style={{ marginBottom: "10px" }}>Create a new segment</h4>
        <Input
          type="search"
          name="segment"
          placeholder="Segment name"
          list="segments"
          autoComplete="off"
          onChange={e => props.changeSearchTerm(e.target.value)}
          value={props.searchTerm}
          style={{ marginBottom: "20px" }}
        />
        <h4 style={{ marginBottom: "10px" }}>Choose one from existing segments</h4>
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
