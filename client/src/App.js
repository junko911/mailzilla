import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Nav/Navbar'
import Campaigns from './Campaign/Campaigns'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <Navbar />
        </div>
        <Switch>
          <Route path="/campaigns" component={Campaigns} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
