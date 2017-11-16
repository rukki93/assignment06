var myData;
var people = [];
var falcon;

function preload() {
	myData = loadJSON('assets/peopleinspace.json');
	starship1 = loadImage('./assets/starship1.png');
	starship2 = loadImage('./assets/starship2.png');
	spacewarp = loadImage('./assets/spacewarp.png');
	stars = loadImage('./assets/stars.jpg');
}

function setup() {
   angleMode(DEGREES);
   createCanvas(800, 800);
   
   falcon = new Falcon();
	
	for (var i = 0; i < myData.people.length; i++) {
	   var data = myData.people[i];
		var newStarship = new Starship(data.launchdate, data.name, data.title);
		people.push(newStarship);
	}
}


function draw() {
   imageMode(CENTER);
   
   if(mouseIsPressed) {
      image(spacewarp,width/2,height/2,1000,800)
   } else {
      image(stars, width/2, height/2, 800, 800);
   }
   
   falcon.move();
   falcon.display();

	for (var i = 0; i < people.length; i++) {
		var starship = people[i];
		starship.move();
		starship.display();
	}
}

function Starship(launchDate,name,title) {
   
   this.name = name;
   this.title = title;
   this.launchDate = Date.parse(launchDate);
   var timeInSpace = Date.now() - this.launchDate;
   this.radius = floor(timeInSpace / (1000 * 60 * 60 * 24)) / 5;

   this.x = random(this.radius, width-this.radius);
   this.y = random(this.radius, height-this.radius);

	this.incrementX = 0.6;
	this.incrementY = 0.6;

	this.display = function() {
      imageMode(CENTER);
      image(starship2, this.x, this.y, 56.5, 60.5);
   }

	this.move = function() {
	   
	   
	   if(mouseIsPressed) {
	      this.x += this.incrementX*10;
		   this.y += this.incrementY*5;
	   } else {
	      this.x += this.incrementX*6;
	      this.y += this.incrementY*4;
	   }
		
		if (this.x >= width - this.radius || this.x < 20){
         this.incrementX *= -1
      }

      if (this.y >= height - this.radius || this.y < 20){
         this.incrementY *= -1
      }
      
	}
}

function Falcon(e,f,size) {
  
  this.e = random(76.5,width-76.5);
  this.f = random(103.5,height-103.5);
  this.incrementE = 1;
  this.incrementF = 1;
  this.size1 = 76.5;
  this.size2 = 103.5;
  
  this.display = function () {
     imageMode(CENTER);
     image(starship1, this.e, this.f, this.size1, this.size2);
  }
  
   this.move = function () {
      if(mouseIsPressed) {
         this.e += this.incrementE*15;
         this.f += this.incrementE*10;
      } else {
         this.e += this.incrementE*7;
         this.f += this.incrementF*5;
      }
    
      if (this.e >= width - this.size1/2 || this.e < this.size1/2){
            this.incrementE *= -1
         }

      if (this.f >= height - this.size2/2 || this.f < this.size2/2){
            this.incrementF *= -1
         }
  }
}