class Player {
    position = []
    size = []

    constructor() {
        this.position = new Vector2(0, 0)
        this.size = new Vector2(40, 40)
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
}
