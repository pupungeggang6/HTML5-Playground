let canvas
let gl 

let programLoop
let frameCurrent
let framePrevious
let delta
let state = 'Start'

let keyPressed = {'Up': false, 'Left': false, 'Down': false, 'Right': false}
let mouse = {x: 0, y: 0}

let program
let vShader, fShader
let lColor, lPosition, lCameraRotate, lCameraTranslate, lCameraProj
let vaot, vaol, vaoh, vbot, vbol, vboh
let cameraRotate = {x: 0, y: 0}
let cameraTranslate = {x: 0, y: 0.5, z: 0}
let cameraPerspective = {fovy: Math.PI / 3, aspect: 1.6, zNear: 0.01, zFar: 10.0}
let matrixCameraTranslate
let matrixCameraRotate
let matrixCameraProj

let direction = {
    forward: {x: 0, z: -1},
    left: {x: -1, z: 0},
    right: {x: 1, z: 0},
    backward: {x: 0, z: 1}
}
