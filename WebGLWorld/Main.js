window.onload = main

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl2')
    glInit()

    frameCurrent = Date.now()
    framePrevious = Date.now() - 16
    programLoop = requestAnimationFrame(loop)
}

function loop() {
    framePrevious = frameCurrent
    frameCurrent = Date.now()

    //tData[0][3] += 0.001
    //tData[0][9] += 0.001
    //tData[0][15] += 0.001
    render()

    gameLoop = requestAnimationFrame(loop)
}
