import React, { useEffect } from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom'
import Navbar from './Nav/Navbar'
import CampaignList from './Campaign/List'
import ContactsList from './Contact/List'
import Home from './Common/Home'
import { getCurrentUser, logout, getSegments } from './redux/actions';
import { connect } from 'react-redux'
import { history } from './index'
import Login from './Nav/Login';
import SignUp from './Nav/Signup';

const App = props => {

  useEffect(() => {
    props.getUser()
    props.getSegments()
  }, [props])

  return (
    <Router history={history}>
      <div className="header">
        <Navbar logoutHandler={props.logoutHandler} />
      </div>
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/campaigns" component={CampaignList} />
          <Route path="/contacts" component={ContactsList} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

const mdp = dispatch => {
  return {
    getUser: () => dispatch(getCurrentUser()),
    getSegments: () => dispatch(getSegments()),
    logoutHandler: () => dispatch(logout())
  }
}

export default connect(null, mdp)(App)
