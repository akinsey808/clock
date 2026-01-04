// minute triangle dimensions
var tw = 200;
var th = 300;

let bg; // so the gradient stays in the backgorund

// setup() is called once at page-load
function setup() {
  createCanvas(500, 500);
  bg = createGraphics(width, height); // bg so gradient not bleeding in front 
  print("This deconstructed water lily clock uses three different visualizations to represent the hours, minutes, and seconds. The hours are represented by yellow circles, in military time. This represents the middle of the lily. The petals are represented using a triangle that slowly turns a lighter blue as an hour progresses, moving once a minute. The lily pad is represented by a growing gradient that turns green throughout a minute, changing every second, and resetting back to white after a minute.);
}

// draw the yellow circles for hours
function hourCircle(x, y, dia) {
  fill(220, 180, 0); // yellow
  ellipse(x, y, dia, dia);
}

// draw background triangle 
function drawStaticTri(x1, y1, x2, y2, x3, y3) { 
  fill(28, 142, 174, 255); // lily blue
  triangle(x1, y1, x2, y2, x3, y3);
}

/* radial gradient adapted from: https://editor.p5js.org/george.gala/sketches/nKMYJ6iTy */
function radialGradient(g, sX, sY, sR, eX, eY, eR, startColor, endColor) {
  let gradient = g.drawingContext.createRadialGradient(
    sX, sY, sR, eX, eY, eR
  );
  gradient.addColorStop(0, startColor);
  gradient.addColorStop(1, endColor);

  g.drawingContext.fillStyle = gradient;
}

// draw() is called 60 times per second
function draw() {
  let hr = hour();
  let min = minute();
  let sec = second();
  
  // assignment requirement to print the minute 
  if(sec == 59) { 
    print(min);
  }

  // triangle variables
  var mid = width / 2;
  var tx1 = mid - tw / 2;
  var ty1 = mid - th / 2;
  var tx2 = mid + tw / 2;
  var ty2 = mid - th / 2;
  var ty3 = ty1 + th;

  // variables for hour circle
  let radius = 60;

  // dynamic variable for moving triangle
  var ts = map(min, 0, 60, 0, 100);

  noStroke();
  
  // gradient background
  bg.clear();
  bg.noStroke();

  // dynamic radius that changes with seconds
  let r = map(sec, 0, 60, 0, 340);

  radialGradient(
    bg,
    width / 2 - 40, height / 2 - 120, 0,
    width / 2 - 40, height / 2 - 120, r,
    'rgba(94,164,120,0.4)',
    'rgba(255,255,255,0.4)'
  );

  bg.ellipse(width / 2, height / 2.1, 400, 400);

  image(bg, 0, 0);

  // in front

  // static triangle
  drawStaticTri(tx1, ty1, tx2, ty2, mid, ty3);

  /* dynamic triangle, moves every minute, when fully light blue it is at 0 minutes, when fully dark blue, it is at 60 minutes */
  fill(255, 255, 255, 130);
  triangle(
    tx1 + ts, ty1 + min * (th / 60),
    tx2 - ts, ty2 + min * (th / 60),
    mid, ty3
  );

  // hour circle
  for (var i = 0; i < hr; i++) {
    let angle = TWO_PI * i / 24 - HALF_PI;
    let x = mid + cos(angle) * radius;
    let y = mid - th / 4 + sin(angle) * radius;
    hourCircle(x, y, 13);
  }
}
