let canvas
let gl
let d

let programLoop
let frameCurrent
let framePrevious
let delta

let keyPressed = {'Up': false, 'Left': false, 'Down': false, 'Right': false}
let mouse = {x: 0, y: 0}
let state = 'Start'

let program, vShader, fShader
let vao, vbo, vtr
let lColor, lMTranslate, lMScale, lMRotate, lCRotate, lCTranslate, lCProjection

let tData = [
    [
        1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        1.0, 1.0, 1.0, 0.0, 0.0, 0.0
    ],
    [
        1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        1.0, 1.0, 1.0, 0.0, 0.0, 0.0
    ],
]
let vData = [
    [
        0.5, -0.5, -1.0, 0.0, 1.0, 0.0,
        0.5, 0.5, -1.0, 0.0, 1.0, 0.0,
        -0.5, -0.5, -1.0, 0.0, 1.0, 0.0
    ],
    [
        0.5, 0.5, -1.0, 0.0, 1.0, 0.0,
        -0.5, -0.5, -1.0, 0.0, 1.0, 0.0,
        -0.5, 0.5, -1.0, 0.0, 1.0, 0.0
    ],

]

let thing

let camera = {
    translate: {x: 0, y: 0, z: 0},
    foward: {x: 0, y: 0, z: -1},
    backward: {x: 0, y: 0, z: 1},
    left: {x: -1, y: 0, z: 0},
    right: {x: 1, y: 0, z: 0},
    turn: 0,
    vertical: 0,
}

let cameraProjectionMat

let cameraRotateMat = [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]
