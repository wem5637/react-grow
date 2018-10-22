import React, { Component } from 'react';
import './Flower.css';

class Flower extends Component {
  drawFractalTree(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    function draw(startX, startY, len, angle) {
      ctx.beginPath();
      ctx.save();
      
      ctx.translate(startX, startY);
      ctx.rotate(angle * Math.PI/180);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();
      
      if(len < 10) {
        ctx.restore();
        return;
      }
      
      draw(0, -len, len*0.8, -15);
      draw(0, -len, len*0.8, 15);
      
      ctx.restore();
    }

    draw((1000/6)*(this.props.position+1),500,this.props.flower.length,0);
  }

  inbreed = ()=>{
  	this.props.inbreed(this.props.flower)
  }
  componentDidMount(){
    this.drawFractalTree()
  }
  componentDidUpdate(){
  	this.drawFractalTree()
  }

  render() {
    return (
      <div className="flowerbed" onClick={this.inbreed}>
      </div>
    );
  }
}

export default Flower;
