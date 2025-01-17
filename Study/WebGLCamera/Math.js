function matrixIdentity() {
    return [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]
}

function matrixMul(mat1, mat2) {
    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            result[i * 4 + j] = mat1[i * 4 + 0] * mat2[j + 4 * 0] + mat1[i * 4 + 1] * mat2[j + 4 * 1] + mat1[i * 4 + 2] * mat2[j + 4 * 2] + mat1[i * 4 + 3] * mat2[j + 4 * 3]
        }
    }
    return result
}

function getCameraRotate(x, y) {
    let m = matrixIdentity()
    let cx = Math.cos(-x)
    let cy = Math.cos(-y)
    let sx = Math.sin(-x)
    let sy = Math.sin(-y)

    let mx = [
        1.0, 0.0, 0.0, 0.0,
        0.0, cx, -sx, 0.0,
        0.0, sx, cx, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]

    let my = [
        cy, 0.0, sy, 0.0,
        0.0, 1.0, 0.0, 0.0,
        -sy, 0.0, cy, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]

    return matrixMul(mx, matrixMul(my, m))
}

function rotateForward(angle) {
    let c = Math.cos(angle)
    let s = Math.sin(angle)

    return {x: -s, z: -c}
}

function getCameraTranslate(x, y, z) {
    return [
        1.0, 0.0, 0.0, -x,
        0.0, 1.0, 0.0, -y,
        0.0, 0.0, 1.0, -z,
        0.0, 0.0, 0.0, 1.0
    ]
}

function gluPerspective(fovy, aspect, zNear, zFar) {
    let f = 1 / Math.tan(fovy / 2)

    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (zFar + zNear) / (zNear - zFar), (2 * zNear * zFar) / (zNear - zFar),
        0, 0, -1, 0
    ]
}

function glOrtho(l, r, b, t, n, f) {
    return [
        2 / (r - l), 0.0, 0.0, -(r + l) / (r - l),
        0.0, 2 / (t - b), 0.0, -(t + b) / (t - b),
        0.0, 0.0, -2 / (f - n), -(f + n) / (f - n),
        0.0, 0.0, 0.0, 1.0,
    ]
}
