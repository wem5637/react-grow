import React, { Component } from 'react';
import './Plot.css';
import Flower from './Flower';

class Plot extends Component {
  render() {
    return (
      <div className="pot">
        {this.props.plot?<div><Flower position={this.props.plotno} inbreed={this.props.inbreed} flower={this.props.plot}/></div>:null}
      </div>
    );
  }
}

export default Plot;
