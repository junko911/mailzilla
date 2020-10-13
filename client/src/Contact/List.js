import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { getContacts } from '../redux/actions'
import { Route, Switch } from 'react-router-dom'
import Row from './Row'
import Details from './Details'
import Import from './Import'
import ContactTable from './ContactTable'

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
          <Route path='/contacts/import' component={Import} />
          <Route path='/contacts/:id' render={({ match }) => {
            if (this.props.contacts) {
              let id = parseInt(match.params.id)
              let foundContact = this.props.contacts.find(contact => contact.id === id)
              return <Details contact={foundContact} />
            }
            return <div>Loading...</div>
          }} />
          <Route path='/contacts' render={() => {
            return (
              <>
                <h1>Contacts</h1>
                <Button color="success" href="/contacts/import">Import Contacts</Button>
                {this.props.contacts ?
                  <ContactTable contacts={this.props.contacts} />
                  :
                  <div>Loading...</div>
                }
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
