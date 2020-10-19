import React from 'react'
import {Row, Col} from 'reactstrap'

const Home = () => {
  return (
    <Row>
      <Col xs="6">
        <div style={{border: "1px solid black", height:"500px"}}>
          Send newsletter to customer...
        </div>
      </Col>
      <Col xs="6">
        <div style={{border: "1px solid black", height:"500px"}}></div>
      </Col>
    </Row>
    )
}

export default Home
