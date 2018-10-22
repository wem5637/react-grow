import React, { Component } from 'react';
import './Flower.css';

class Flower extends Component {
  drawFractalTree(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    function draw(startX, startY, len, angle, branchWidth, strokeStyle, fillStyle, angleDev) {
      ctx.beginPath();
      ctx.save();
      ctx.strokeStyle = strokeStyle;
      ctx.fillStyle = fillStyle;
      ctx.lineWidth = branchWidth;
      ctx.translate(startX, startY);
      ctx.rotate(angle * Math.PI/180);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();
      ctx.shadowBlur = 1;
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      if(len < 10) {
          ctx.beginPath();
          ctx.arc(0, -len, 10, 0, Math.PI/2);
          ctx.fill();
          ctx.restore();
          return;
      }
      draw(0, -len, len*0.8, angle+angleDev, branchWidth*0.8, strokeStyle, fillStyle, angleDev);
      draw(0, -len, len*0.8, angle-angleDev, branchWidth*0.8, strokeStyle, fillStyle, angleDev);
      
      ctx.restore();
    }
    draw((1000/6)*(this.props.position+1), 700, this.props.flower.length, this.props.flower.angle, this.props.branchWidth, this.props.flower.stemColor, this.props.flower.petalColor, this.props.flower.angleDev);
  }

  inbreed = () => {
  	this.props.inbreed(this.props.flower)
  }

  destroy = () => {
    this.props.destroy(this.props.flower)
  }

  componentDidMount(){
    this.drawFractalTree()
  }

  componentDidUpdate(){
  	this.drawFractalTree()
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.destroy}>X</button>
        <div className="flowerbed" onClick={this.inbreed}></div>
      </React.Fragment>
    );
  }
}

export default Flower;
