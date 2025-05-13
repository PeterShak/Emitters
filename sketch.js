let emitters = [];
let magnets = [];
let G;
let canvas;

function setup() {
  canvas = createCanvas(400, 600);
  canvas.canvas.oncontextmenu = () => false; // Disable right-click menu
  resetScene();
  ellipseMode(RADIUS);
  noStroke();
}

function resetScene() {
  emitters = [new Emitter(width / 2, 30)];
  magnets = [];
  G = createVector(0, 0.1);
}

function draw() {
  background(220);

  // Gravity control
  if (keyIsDown(UP_ARROW)) {
    G.y = max(-1, G.y - 0.01);
  } else if (keyIsDown(DOWN_ARROW)) {
    G.y = min(1, G.y + 0.01);
  }

  // Draw magnets
  for (let m of magnets) {
    m.draw();
  }

  // Update emitters and apply magnet forces
  for (let e of emitters) {
    e.update();

    for (let p of e.particles) {
      for (let m of magnets) {
        m.applyTo(p);
      }
    }
  }

  console.log("Gravity: " + G.y.toFixed(2));
}

class Emitter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for (let i = 0; i < 20; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }

  update() {
    this.particles = this.particles.filter(p => !p.isDead());

    for (let p of this.particles) {
      p.applyForce(G);
      p.update();
      p.draw();
    }

    // Emit more particles each frame
    for (let i = 0; i < 2; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    emitters.push(new Emitter(mouseX, mouseY));
  } else if (mouseButton === RIGHT) {
    magnets.push(new Magnet(mouseX, mouseY));
  }
}

function keyPressed() {
  // SPACE = remove all magnets
  if (key === ' ') {
    magnets = [];
  }

  // Backspace = reset everything 
  if (keyCode === 46) {
    resetScene();
  }

  // M — toggle polarity
  if (key === 'm' || key === 'M') {
    for (let m of magnets) {
      m.togglePolarity();
    }
  }
}
