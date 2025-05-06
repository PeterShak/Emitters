class Particle {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = p5.Vector.random2D().mult(random(0.5, 2))
    this.acceleration = createVector(0, 0)

    // Random radius
    this.r = random(5, 15)

    this.lifespan = 255

    // Random color
    this.color = color(random(100, 255), random(100, 255), random(100, 255))
  }

  update() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
    this.lifespan -= 2
  }

  isDead() {
    return this.lifespan < 0
  }

  draw() {
    fill(this.color)
    circle(this.position.x, this.position.y, this.r)
  }

  applyForce(f) {
    this.acceleration.add(f)
  }

  static createStandardParticleAt(x, y) {
    return new Particle(x, y)
  }
}
