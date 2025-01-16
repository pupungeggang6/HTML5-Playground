window.onload = main

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl2')

    glInit()

    progLoop = requestAnimationFrame(loop)
}

function loop() {
    render()
    progLoop = requestAnimationFrame(loop)
}
