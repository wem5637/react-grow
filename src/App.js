import React, { Component } from 'react';
import './App.css';
import Grow from './Grow.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>
            Grow
          </h2>
        </header>
        <Grow/>
      </div>
    );
  }
}

export default App;
