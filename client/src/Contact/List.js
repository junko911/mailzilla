import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { getContacts } from '../redux/actions'
import { Redirect, Route, Switch } from 'react-router-dom'
import Details from './Details'
import Import from './Import'
import ContactTable from './ContactTable'

class List extends React.Component {

  componentDidMount() {
    this.props.fetchContacts()
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route path='/contacts/import' component={Import} />
          <Route path='/contacts/:id' render={({ match }) => {
            if (this.props.contacts) {
              let id = parseInt(match.params.id)
              let foundContact = this.props.contacts.find(contact => contact.id === id)
              return <Details contact={foundContact} />
            }
            return <div className="loader"></div>
          }} />
          <Route path='/contacts' render={() => {
            return (
              <>
                <div className="title">
                  <h1>Contacts</h1>
                  <Button color="success" href="/contacts/import">Import Contacts</Button>
                </div>
                {this.props.contacts ?
                  <ContactTable contacts={this.props.contacts} segments={this.props.segments} />
                  :
                  <div className="loader"></div>
                }
              </>
            )
          }} />
        </Switch>
      </div>
    )
  }
}

const msp = state => {
  return { contacts: state.contacts, segments: state.segments }
}

const mdp = dispatch => {
  return { fetchContacts: () => dispatch(getContacts()) }
}

export default connect(msp, mdp)(List)
