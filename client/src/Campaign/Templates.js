import React from 'react'
import { Row, Col, Button } from 'reactstrap'

const Templates = props => {
  const genOptions = () => {
    return props.templates.map((template) => {
      return (
        <Col xs="3" key={template.id}>
          <div
            style={{
              border: props.templateId === template.id ? "1px solid red" : "1px solid #ced4da",
              height: "100px",
              textAlign: "center",
              padding: "28px"
            }}
          >
            <Button
              outline id={template.id}
              color="primary"
              onClick={props.selectHanlder}
            >{template.title}</Button>
          </div>
        </Col >
      )
    })
  }

  return (
    <>
      <div style={{ fontSize: "1rem" }}>Templates</div>
      <Row>
        {genOptions()}
      </Row>
    </>
  )
}

export default Templates
