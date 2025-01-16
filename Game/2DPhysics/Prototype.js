class Player {
    position = []
    size = []
    speed = 0

    constructor() {
        this.position = new Vector2(0, 0)
        this.size = new Vector2(40, 40)
        this.speed = 200
    }

    move() {
        let velocity = new Vector2(0, 0)
        if (keyPress['Left'] === true) {
            velocity.x += -this.speed
        }
        if (keyPress['Right'] === true) {
            velocity.x += this.speed
        }
        velocity.mul(delta / 1000)

        this.position.add(velocity)
    }

    render() {
        context.strokeRect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y)
    }
}

class Vector2 {
    x = 0
    y = 0

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(vec2b) {
        this.x += vec2b.x
        this.y += vec2b.y
    }

    mul(num) {
        this.x *= num
        this.y *= num
    }

    getNorm() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    normalize() {
        let norm = this.getNorm()
        this.x /= norm
        this.y /= norm
    }
}
