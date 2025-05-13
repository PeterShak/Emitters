let emitters = [];
let magnets = [];
let G;
let canvas;

function setup() {
  canvas = createCanvas(400, 600);
  canvas.canvas.oncontextmenu = () => false; // Disable context menu on right-click
  emitters.push(new Emitter(width / 2, 30));
  magnets.push(new Magnet(width / 2, height / 2));
  G = createVector(0, 0.1);
  ellipseMode(RADIUS);
  noStroke();
}

function draw() {
  background(220);

  // Gravity controls
  if (keyIsDown(UP_ARROW)) {
    G.y = max(-1, G.y - 0.01);
  } else if (keyIsDown(DOWN_ARROW)) {
    G.y = min(1, G.y + 0.01);
  }

  // Draw magnets
  for (let m of magnets) {
    m.draw();
  }

  for (let e of emitters) {
    e.update();

    for (let p of e.particles) {
      for (let m of magnets) {
        m.applyTo(p);
      }
    }
  }

  // Display gravity
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

    this.particles.push(new Particle(this.x, this.y));
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
  if (key === 'm' || key === 'M') {
    for (let m of magnets) {
      m.togglePolarity();
    }
  }
}
