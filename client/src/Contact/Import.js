import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { importContacts } from '../redux/actions'

const Import = props => {

  const [alert, setAlert] = useState(false)
  const toggle = () => setAlert(!alert)
  const alertDisplay = alert ? "block" : "none"

  const [inputValue, changeInputValue] = useState("")
  const [contactCount, changeContactCount] = useState(0)

  const importContacts = e => {
    e.preventDefault()
    props.importContacts(inputValue, props.currentUser.id).then(data => {
      toggle()
      changeContactCount(data.payload.length)
      changeInputValue("")
    })
  }

  return (
    <>
      <h1>Import</h1>
      <Alert color="success" style={{ display: alertDisplay }}>
        {contactCount > 0 ? `${contactCount} contacts added!` : `${contactCount} contacts added. They might already have been in your list.`}
      </Alert>
      <Form onSubmit={importContacts}>
        <FormGroup>
          <Label for="copy-paste-field">Paste your contact information from your spreadsheet into this field.</Label>
          <Input
            type="textarea"
            name="text"
            id="copy-paste-field"
            placeholder="example@example.com          Name"
            value={inputValue}
            onChange={e => changeInputValue(e.target.value)}
            style={{ minHeight: "200px" }} />
        </FormGroup>
        <Button color="success">Import</Button>
      </Form>
    </>
  )
}

const msp = state => {
  return { currentUser: state.currentUser }
}

const mdp = dispatch => {
  return { importContacts: (inputValue, userId) => dispatch(importContacts(inputValue, userId)) }
}

export default withRouter(connect(msp, mdp)(Import))
