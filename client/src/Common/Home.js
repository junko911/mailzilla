import React from 'react'
import { Button } from 'reactstrap'
import { login } from '../redux/actions'
import { connect } from 'react-redux'

const Home = ({ demoLogin }) => {
  return (
    <div className="home">
      <div className="home-content">
        <span>Send</span>
        <span style={{ margin: "0 10px" }}>Email Newletters</span>
        <span>With Confidence</span>
        <h4 style={{ width: "70%", margin: "10px auto" }}>Partner with the email service trusted by developers and marketers for time-savings, scalability, and delivery expertise.</h4>
        <div style={{ marginTop: "24px" }}>
          <Button color="success" onClick={demoLogin}>
            <span role="img" aria-label="rocket" style={{ fontSize: "24px" }}>🚀</span> Try Demo
          </Button>
        </div>
      </div>
    </div>
  )
}

const mdp = dispatch => ({
  demoLogin: () => dispatch(login({ email: "demo@mailzilla.com", password: "demo1234" }))
})

export default connect(null, mdp)(Home)
