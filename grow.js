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
	}
}

var plots = {
	"0": null,
	"1": new DayFlower(),
	"2": null,
	"3": new NightFlower(),
	"4": null
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
	return num+randSign1*mag;
}

var flowerBreedPropDiff = {
	stemHeight:.2,
	stemWidth:.2,
	stemColor: 40,
	petalNum:1,
	petalSize:.2,
	petalColor: 40,
	petalVariety:.1,
	bulbSize:.2,
	bulbColor: 40,
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


Flower.prototype.grow = function(){
	//start grow animation
}

Flower.prototype.plant = function(flower){
	var rand4 = Math.floor(Math.random()*4);
	plots[rand4] = Object.assign(new Flower(), flower);
}

Flower.prototype.inbreed = function(){
	var keys = Object.keys(this)
	var flower = {}
	keys.forEach((key)=>{
		if(flowerBreedPropDiff[key]){
			flower[key] = valueOscillator(this[key], key, true)
		}
	})
	this.destroy();
	this.plant(flower);
}

Flower.prototype.crossbreed = function(flower2){
	var keys = Object.keys(flower1)
	var newFlower = {}
	keys.forEach((key)=>{
		if(flowerBreedPropDiff[key]){
			newFlower[key] = valueOscillator((this[key]+flower2[key]/2)/(this[key]), key)
		}
	})

	this.plant(flower);
	this.degrade();
}

Flower.prototype.decrementBreedCounter = function(){
	//decrement breed counter
	this.breedCounter = this.breedCounter-1;
	if(this.breedCounter<=0){
		this.destroy();
	}
}


Flower.prototype.degrade = function(){
	//decrement breed counter
	this.decrementBreedCounter();
}

Flower.prototype.destroy = function(){
	var plotsKeys = Object.keys(plots)

	plotsKeys.forEach(plotKey=>{
		if(plots[plotKey]&&plots[plotKey].id===this.id){
			plots[plotKey]=null;
		}
	})
}
