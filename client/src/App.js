import React from 'react';
import logo from './logo.svg';
import './App.css';
import ControlledEditor from './ControlledEditor'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ControlledEditor/>
      </header>
    </div>
  );
}

export default App;
