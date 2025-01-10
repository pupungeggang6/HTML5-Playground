window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    context = canvas.getContext('2d')
    canvasNumber = document.getElementById('ScreenNumber')
    contextNumber = canvasNumber.getContext('2d')

    drawInit()
    drawAxis()
}

function errorHandle(err, url, line, col, obj) {
}

function rightClick() {
    return false
}
