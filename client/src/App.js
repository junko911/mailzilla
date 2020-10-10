import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Nav/Navbar'
import CampaignList from './Campaign/List'
import ContactsList from './Contact/List'
import Home from './Home'
import { getCurrentUser } from './redux/actions';
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="header">
          <Navbar />
        </div>
        <div className="container">
          <Switch>
            <Route path="/campaigns" component={CampaignList} />
            <Route path="/contacts" component={ContactsList} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mdp = dispatch => {
  return { getUser: () => dispatch(getCurrentUser(1)) }
}

export default connect(null, mdp)(App)
