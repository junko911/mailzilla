import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Nav/Navbar'
import Campaigns from './Campaign/Campaigns'

function App() {
  return (
    <BrowserRouter>
    <div className="header">
      <Navbar/>
      <Switch>
        <Route path="/campaigns" component={Campaigns}/>
      </Switch>
    </div>
    <div className="container"></div>
    </BrowserRouter>
  );
}

export default App;
