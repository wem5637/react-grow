import React, { Component } from 'react';
import Garden from './Garden';
class Grow extends Component {
	constructor(){
		super()
		this.state={plots: [null, new DayFlower(), null, new NightFlower(), null]};

	}

	plant=(newflower, newflower2, oldflower)=>{
		var plotsKeys = Object.keys(this.state.plots)
		plotsKeys.forEach(plotKey => {
			if(this.state.plots[plotKey] && this.state.plots[plotKey].id === oldflower.id){
				var newArr = this.state.plots.slice()
				newArr[plotKey] = null;		
				var rand4 = Math.floor(Math.random()*5);
				var rand42 = Math.floor(Math.random()*5);

				newArr[rand4] = newflower;
				newArr[rand42] = newflower2;
				this.setState({plots: newArr});
			}
		})
	}

	inbreed = (oldflower) => {
		var keys = Object.keys(oldflower);
		var newFlower = new Flower();
		keys.forEach((key)=>{
			if(flowerBreedPropDiff[key]){
				if(key.toString().slice(-5).toLowerCase()==="color"){
					newFlower[key] = colorOscillator(oldflower[key], key, true);
				}else{
					newFlower[key] = valueOscillator(oldflower[key], key, true);
				}
			}
		})
		var newFlower2 = new Flower();
		keys.forEach((key)=>{
			if(flowerBreedPropDiff[key]){
				if(key.toString().slice(-5).toLowerCase()==="color"){
					newFlower2[key] = colorOscillator(oldflower[key], key, true);
				}else{
					newFlower2[key] = valueOscillator(oldflower[key], key, true);
				}
			}
		})
	    var c = document.getElementById("myCanvas");
	    var ctx = c.getContext("2d");
	    ctx.clearRect(0,0,1000,700);
		this.plant(newFlower, newFlower2, oldflower);
	}

	crossbreed = (flower1, flower2) => {
		var keys = Object.keys(flower1)
		var newFlower = {}
		keys.forEach((key)=>{
			if(flowerBreedPropDiff[key]){
				if(key.toString().slice(-5).toLowerCase()==="color"){
					var fl1rgb = flower1[key].slice(4, -1).split(',').map((num)=>{return parseInt(num)})
					var fl2rgb = flower2[key].slice(4, -1).split(',').map((num)=>{return parseInt(num)})
					var rgbavg = []
					for(var i = 2;i>=0;i--){
						rgbavg.push((fl1rgb[i]+fl2rgb[i])/2)
					}
					var rgb = `rgb(${rgbavg[0]},${rgbavg[1]},${rgbavg[2]})`

					newFlower[key] = colorOscillator(rgb, key)
				}else{
					newFlower[key] = valueOscillator((flower1[key]+flower2[key]/2)/(flower1[key]), key)
				}
			}
		})

		this.plant(newFlower);
		this.degrade(flower1);
		this.degrade(flower2);
	}

	degrade = async (flower) => {
		//decrement breed counter
		flower.breedCounter = flower.breedCounter-1;
		if(flower.breedCounter <= 0){
			await this.destroy(flower);
		}
	}

	destroy = (flower) => {
		var plotsKeys = Object.keys(this.state.plots);
		plotsKeys.forEach(plotKey=>{
			if(this.state.plots[plotKey]&&this.state.plots[plotKey].id===flower.id){
				var newArr = this.state.plots.slice();
				newArr[plotKey] = null;
			    var c = document.getElementById("myCanvas");
			    var ctx = c.getContext("2d");
			    ctx.clearRect(0,0,1000,700);
				this.setState({plots:newArr});
			}
		})
	}

  render() {
    return (
      <div>
        <Garden inbreed={this.inbreed} destroy={this.destroy} plots={this.state.plots}/>
      </div>
    );
  }
}

export default Grow;

class DayFlower extends Flower{
	constructor() {
		super();
		this.stemColor = 'rgb(0,255,0)';
		this.petalColor = 'rgb(255,0,0)';
		this.length = 30;		
		this.branchWidth = 3;
		this.angle = 2;
		this.angleDev = 8;
		this.splitParam = 8;
		this.leafSize = 10;
	}
}

class NightFlower extends Flower{
	constructor() {
		super();
		this.stemColor = 'rgb(0,0,0)';
		this.petalColor = 'rgb(255,0,255)';
		this.length = 35;
		this.branchWidth = 2;
		this.angle = -3;
		this.angleDev = 8;
		this.splitParam = 12;
		this.leafSize = 10;
	}
}

var colorOscillator = function(rgb, key, inbreedBool){
	//ex. rgb(10,20,30)
	var orig = rgb.slice(4,-1).split(',').map((num)=>parseInt(num))
	var mult = 1;
	if(inbreedBool){
		mult = 2;
	}

	var mag = mult*(Math.random())*flowerBreedPropDiff[key];
	var colors = {
		red:Math.random(),
		green:Math.random(),
		blue:Math.random(),
	}
	var total = colors.red+colors.green+colors.blue;
	var randSign1 = Math.round(Math.random());
	if(randSign1 === 0){
		randSign1 = -1;
	}
	var randSign2 = Math.round(Math.random());
	if(randSign2 === 0){
		randSign2 =- 1;
	}
	var randSign3 = Math.round(Math.random());
	if(randSign3 === 0){
		randSign3 =- 1;
	}

	return `rgb(${orig[0]+randSign1*mag*colors.red/total},${orig[1]+randSign2*mag*colors.green/total},${orig[2]+randSign3*mag*colors.blue/total})`;
}

var valueOscillator = function(num, key, inbreedBool){
	var mult = 1;
	if(inbreedBool){
		mult = 2;
	}
	var mag = mult*(2*Math.random()-1)*flowerBreedPropDiff[key];
	var randSign1 = Math.round(Math.random());
	if(randSign1===0){
		randSign1=-1;
	}
	if(num+randSign1*mag>0){
		return num+randSign1*mag;
	}else{
		return num;
	}
}

var flowerBreedPropDiff = {
	stemColor: 40,
	petalColor: 40,
	branchWidth:.1,
	angle: .5,
	length: 1,
	angleDev: .1,
	splitParam: .01,
	leafSize: .1
}



function Flower(length, angle, branchWidth, petalColor, stemColor, angleDev, splitParam, leafSize){
	this.length = length; 
	this.angle = angle;
	this.branchWidth = branchWidth;
	this.petalColor = petalColor;
	this.stemColor = stemColor;
	this.angleDev = angleDev;
	this.splitParam = splitParam;
	this.leafSize = leafSize;

	this.breedCounter = 2;
	this.id = Math.random()*1000000;
}

