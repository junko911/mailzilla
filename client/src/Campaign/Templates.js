import React from 'react'
import { Row, Col, Button } from 'reactstrap'

const Templates = props => {
  const genOptions = () => {
    return props.templates.map((template) => {
      return (
        <Col xs="4" key={template.id}>
          <div
            className="template"
            id={`template-${template.id}`}
            style={{
              border: props.templateId === template.id ? "1px solid #007bff" : "1px solid #ced4da",
            }}
          >
            <Button
              className="template-btn"
              id={template.id}
              color="secondary"
              onClick={props.selectHanlder}
            >Choose</Button>
          </div>
          <div className="template-title">{template.title}</div>
        </Col >
      )
    })
  }

  return (
    <>
      <div style={{ fontSize: "1rem", marginBottom: "20px" }}>Templates</div>
      <Row>
        {genOptions()}
      </Row>
    </>
  )
}

export default Templates
