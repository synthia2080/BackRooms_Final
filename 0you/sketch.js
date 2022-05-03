let hum;

function setup() {
  hum = loadSound('../humming.mp3');
  createCanvas(1,1);
  
}

function mouseClicked() {
  if(hum.isPlaying()){
    hum.stop();
  }

  hum.loop();
  hum.setVolume(0.5);
}