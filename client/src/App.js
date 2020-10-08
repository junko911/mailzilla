import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Nav/Navbar'
import List from './Campaign/List'
import { getCurrentUser } from './redux/actions';
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="header">
            <Navbar />
          </div>
          <Switch>
            <Route path="/campaigns" component={List} />
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
