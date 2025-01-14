let canvas
let gl

let programLoop
let frameCurrent
let framePrevious

let program, vShader, fShader
let vao, vbo, vtr
let lColor, lMTranslate, lMScale, lMRotate, lCRotate, lCPosition

let tData = [
    [
        1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
    ],
]
let vData = [
    [
        0.5, -0.5, 0.0, 0.5, 0.5, 0.0,
        0.5, 0.5, 0.0, 0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0, 0.5, 0.5, 0.0
    ],
]
let vertice 
let camera = {
}
