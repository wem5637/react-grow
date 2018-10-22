import React, { Component } from 'react';
import './Garden.css';
import Plot from './Plot'

class Garden extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="backdrop">
          <canvas id="myCanvas" width="1000" height="800">
          Your browser does not support the HTML5 canvas tag.
          </canvas>
          <div className="ground">
            {this.props.plots.map((plot, i) => <Plot key={`k${i}`} inbreed={this.props.inbreed} destroy={this.props.destroy} plotno={i} plot={plot}/>)}
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>Will McCracken 2018</p>
        <p>Credit to Ashraff Hathibelagal for fractal tree code</p>
      </React.Fragment>
    );
  }
}

export default Garden;
