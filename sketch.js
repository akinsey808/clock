// setup() is called once at page-load
function setup() {
    createCanvas(800,600); // make an HTML canvas element width x height pixels

    for (var i = 0; i < 24; i++){
    append(hour_xs, random(width)/3);
    append(hour_ys, random(height));
  }
}

function draw(){
  background(255);
  fill(0);

  for (var i = 0; i < hour(); i++){
    drawBall(hour_xs[i], hour_ys[i], 90, 80);
  }

}


function drawBall(x, y, dia, k) {
  fill(k, 150); // grayscale with 150/255 transparency
  ellipse(x, y, dia, dia);
}

// draw() is called 60 times per second
function draw() {
    let hr = hour();
    let min = minute();
    let sec = second();

    background(225);
    textSize(32);
    fill(180);
    text(hr, 10, 30);
    fill(100);
    text(min, 10, 60);
    fill(0);
    text(sec, 10, 90);
}

