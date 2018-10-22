import React, { Component } from 'react';
import Garden from './Garden';
class Grow extends Component {
	constructor(){
		super()
		this.state={plots: [null, new DayFlower(), null, new NightFlower(), null]};

	}

	plant=(newflower, oldflower)=>{
		var plotsKeys = Object.keys(this.state.plots)
		plotsKeys.forEach(plotKey => {
			if(this.state.plots[plotKey] && this.state.plots[plotKey].id === oldflower.id){
				var newArr = this.state.plots.slice()
				newArr[plotKey] = null;
				
				this.setState({plots:newArr}, ()=>{
					var rand4 = Math.floor(Math.random()*5);
					var newPlots = this.state.plots.slice();
					newPlots[rand4] = newflower;
					this.setState({plots: newPlots});
				})
			}
		})
	}

	inbreed=(oldflower)=>{
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

	    var c = document.getElementById("myCanvas");
	    var ctx = c.getContext("2d");
	    ctx.clearRect(0,0,1000,500);
		this.plant(newFlower, oldflower);
	}

	crossbreed=(flower1, flower2)=>{
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

	destroy= async (flower)=>{
		var plotsKeys = Object.keys(this.state.plots);
		plotsKeys.forEach(plotKey=>{
			if(this.state.plots[plotKey]&&this.state.plots[plotKey].id===flower.id){
				var newArr = this.state.plots.slice();
				newArr[plotKey] = null;
				await this.setState({plots:newArr});
			}
		})
	}

  render() {
    return (
      <div>
        <Garden inbreed={this.inbreed} plots={this.state.plots}/>
      </div>
    );
  }
}

export default Grow;

class DayFlower extends Flower{
	constructor() {
		super();
		this.stemHeight = 5; 
		this.stemWidth = 5;
		this.stemColor = 'rgb(0,255,0)';
		this.petalNum = 4;
		this.petalSize = 5;
		this.petalColor = 'rgb(255,0,0)';
		this.petalVariety = 0;
		this.bulbSize = 5;
		this.bulbColor = 'rgb(255,255,255)';
		this.length = 10;		
		
	}
}

class NightFlower extends Flower{
	constructor() {
		super();
		this.stemHeight = 2; 
		this.stemWidth = 2;
		this.stemColor = 'rgb(0,0,0)';
		this.petalNum = 2;
		this.petalSize = 5;
		this.petalColor = 'rgb(255,0,255)';
		this.petalVariety = 0;
		this.bulbSize = 3;
		this.bulbColor = 'rgb(255,0,0)';
		this.length = 15;				
	}
}
var colorOscillator = function(rgb, key, inbreedBool){
	//ex. rgb(10,20,30)
	var orig = rgb.slice(4,-1).split(',')
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
	// stemHeight:.2,
	// stemWidth:.2,
	// stemColor: 40,
	// petalNum:1,
	// petalSize:.2,
	// petalColor: 40,
	// petalVariety:.1,
	// bulbSize:.2,
	// bulbColor: 40,
	length: 5,
}



function Flower(stemHeight, stemWidth, stemColor, petalNum, petalSize, petalColor, petalVariety, bulbSize, bulbColor){
	this.stemHeight = stemHeight; 
	this.stemWidth = stemWidth;
	this.stemColor = stemColor;
	this.petalNum = petalNum;
	this.petalSize = petalSize;
	this.petalColor = petalColor;
	this.petalVariety = petalVariety;
	this.bulbSize = bulbSize;
	this.bulbColor = bulbColor;
	this.breedCounter = 2;
	this.id = Math.random()*1000000;
}

