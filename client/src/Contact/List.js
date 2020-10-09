import React from 'react'
import { Button, Table } from 'reactstrap'
import { connect } from 'react-redux'
import { getContacts } from '../redux/actions'
import { Route, Switch } from 'react-router-dom'
import Row from './Row'

class List extends React.Component {

  componentDidMount() {
    this.props.fetchContacts()
  }

  genContactRows = () => {
    return this.props.contacts.map(contact => {
      return <Row key={contact.id} contact={contact} />
    })
  }

  render() {
    return (
      <>
        <Switch>
          <Route path='/contacts' render={() => {
            return (
              <>
                <h1>Contacts</h1>
                <Button color="success" href="#">Import Contacts</Button>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Created At</th>
                      <th style={{ width: "160px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.genContactRows()}
                  </tbody>
                </Table>
              </>
            )
          }} />
        </Switch>
      </>
    )
  }
}

const msp = state => {
  return { contacts: state.contacts }
}

const mdp = dispatch => {
  return { fetchContacts: () => dispatch(getContacts()) }
}

export default connect(msp, mdp)(List)
