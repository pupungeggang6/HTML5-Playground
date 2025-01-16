function vecNormalize(vec) {
    let l = Math.sqrt(vec.x ** 2 + vec.y ** 2 + vec.z ** 2)
    return {x: vec.x / l, y: vec.y / l, z: vec.z / l}
}

function vecProjectionXZ(vec) {
    return {x: vec.x, y: 0, z: vec.z}
}

function matRotate(axis, angle, mat) {
    let m = []
    let s = Math.sin(angle)
    let c = Math.cos(angle)

    if (axis === 0) {
        m = [
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ]
    } else if (axis === 1) {
        m = [
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ]
    } else if (axis === 2) {
        m = [
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    }

    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < 16; i++) {
        let row = Math.floor(i / 4)
        let col = i - row * 4
        result[i] = m[row * 4 + 0] * mat[col + 0] + m[row * 4 + 1] * mat[col + 4] + m[row * 4 + 2] * mat[col + 8] + m[row * 4 + 3] * mat[col + 12]
    }

    return result
}
