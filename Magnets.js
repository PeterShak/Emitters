class Magnet {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.polarity = 1; // 1 = attract, -1 = repel
    this.strength = 2000;
  }

  applyTo(particle) {
    let force = p5.Vector.sub(this.position, particle.position);
    let distanceSq = constrain(force.magSq(), 100, 10000); // Prevent extreme forces
    force.normalize();
    force.mult(this.polarity * this.strength / distanceSq);
    particle.applyForce(force);
  }

  togglePolarity() {
    this.polarity *= -1;
  }

  draw() {
    push();
    fill(this.polarity > 0 ? 'blue' : 'red');
    noStroke();
    ellipse(this.position.x, this.position.y, 10, 10);
    pop();
  }
}
