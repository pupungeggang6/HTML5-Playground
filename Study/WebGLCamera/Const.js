const vertice = []
const planeData = new Float32Array([
    5.0, 0.0, 5.0,
    5.0, 0.0, -5.0,
    -5.0, 0.0, 5.0,
    -5.0, 0.0, 5.0,
    5.0, 0.0, -5.0,
    -5.0, 0.0, -5.0
])
const originPlane = new Float32Array([
    0.1, 0.0, 0.1,
    0.1, 0.0, -0.1,
    -0.1, 0.0, 0.1,
    -0.1, 0.0, 0.1,
    0.1, 0.0, -0.1,
    -0.1, 0.0, -0.1
])
const buttonForwardPos = new Float32Array([
    -1.4, 0.9,
    -1.4, 1.0,
    -1.5, 0.9,
    -1.5, 0.9,
    -1.4, 1.0,
    -1.5, 1.0,
])
const buttonLeftPos = new Float32Array([
    -1.5, 0.8,
    -1.5, 0.9,
    -1.6, 0.8,
    -1.6, 0.8,
    -1.5, 0.9,
    -1.6, 0.9,
])
const buttonBackwardPos = new Float32Array([
    -1.4, 0.7,
    -1.4, 0.8,
    -1.5, 0.7,
    -1.5, 0.7,
    -1.4, 0.8,
    -1.5, 0.8,
])
const buttonRightPos = new Float32Array([
    -1.3, 0.8,
    -1.3, 0.9,
    -1.4, 0.8,
    -1.4, 0.8,
    -1.3, 0.9,
    -1.4, 0.9,
])

const forward = {z: -1, x: 0}
