let p0, p1, p2;
var images;
let selected;
let currIndex = 0;
let hum;
let numClicks = 0;

//Image Sources
//https://aliminalplace.tumblr.com/post/632376105837412352  https://www.reddit.com/r/LiminalSpace/comments/iu4eit/an_empty_sears/
// https://sabukaru.online/articles/welcome-to-the-backrooms
function preload(){
  hum = loadSound('../humming.mp3');
  p0 = loadImage('./0.jpeg');
  p1 = loadImage('./1.jpeg');
  p2 = loadImage('./2.jpeg');
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  p0.resize(windowWidth,windowHeight);
  p1.resize(windowWidth,windowHeight);
  p2.resize(windowWidth,windowHeight);

}
function draw(){
  images = [p0, p1, p2];

  image(images[currIndex], 0,0);

  textSize(20);
  textAlign(CENTER);
  text("HEADPHONE WARNING", windowWidth/2, windowHeight- 20);
}

function mouseClicked() {

  if(numClicks < 20){
    if(currIndex == images.length - 1) {
      currIndex = 0;
    }
    else{
      currIndex += 1;
    }
  }
  else{
    if(numClicks % 2 == 0){
      currIndex = 1;
    }
    else{
      currIndex = 0;
    }
  }
  numClicks++;


  console.log(currIndex);

  hum.play();
  

}