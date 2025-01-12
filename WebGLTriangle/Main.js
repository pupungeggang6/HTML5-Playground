window.onload = main

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl2')

    glInit()

    progLoop = requestAnimationFrame(loop)
}

function loop() {
    renderInit()
    drawTriangle()
    progLoop = requestAnimationFrame(loop)
}
