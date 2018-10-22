import React, { Component } from 'react';
import './Garden.css';
import Plot from './Plot'

class Garden extends Component {

  render() {
    return (
      <div className="backdrop">
        <canvas id="myCanvas" width="1000" height="500">
        Your browser does not support the HTML5 canvas tag.
        </canvas>
        <div className="ground">
          {this.props.plots.map((plot, i) => <Plot key={`k${i}`} inbreed={this.props.inbreed} plotno={i} plot={plot}/>)}
        </div>
      </div>
    );
  }
}

export default Garden;
