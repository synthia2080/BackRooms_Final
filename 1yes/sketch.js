//Video Source
//https://www.youtube.com/watch?v=tfuiIAsXYTE
//Some code adapted from https://glitch.com/edit/#!/p5-js-play-video-full-window?path=index.html%3A1%3A0
var vid;
let playing = false;
let count = 300;

function preload(){
  vid = createVideo('videoplayback1.mp4');
}


// This function is called when the video loads
function setup() {
  frameRate(10);
  createCanvas(windowWidth, windowHeight);
}


function draw(){

  vid.hide();
  image(vid, 0, 0, width, height);

  //Text before playing
  if(!playing){
    noFill();
    stroke(255);
    textSize(20);
    textAlign(CENTER);
    text("you felt better back then\n\n\n\n\n am i being watched?\n\n\n\n\n", windowWidth/2, windowHeight/2);
  }
  else{ // Countdown
    textSize()
    text(count, 100, windowHeight - 20)
  }

  //Back to home
  if(count <= 0){
    window.open("../Opening/index.html");
    count = 300;
  }

  count--;
}


//Start video on click
function touchStarted() {
  if (!playing) {
    vid.hide();
    vid.loop();
    playing = true;
  }
}


//Stretch video
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
