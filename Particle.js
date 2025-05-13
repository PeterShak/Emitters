class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    let angle = random(TWO_PI);
    let speed = random(1, 5);
    this.velocity = createVector(cos(angle), sin(angle)).mult(speed);
    this.acceleration = createVector(0, 0);
    this.r = random(5, 15);
    this.lifespan = 500;
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2;
  }

  isDead() {
    return this.lifespan < 0;
  }

  draw() {
    fill(this.color);
    circle(this.position.x, this.position.y, this.r);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  static createStandardParticleAt(x, y) {
    return new Particle(x, y);
  }
}
