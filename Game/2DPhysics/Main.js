window.onload = main
window.oncontextmenu = rightClick
window.onerror = errorHandle

function main() {
    canvas = document.getElementById('Screen')
    context = canvas.getContext('2d')

    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)

    programInit()

    frameCurrent = Date.now()
    framePrevious = Date.now() - 16
    delta = frameCurrent - framePrevious
    programLoop = requestAnimationFrame(loop)
}

function loop() {
    framePrevious = frameCurrent
    frameCurrent = Date.now()
    delta = frameCurrent - framePrevious

    loopProgram()
    
    programLoop = requestAnimationFrame(loop)
}

function keyDown(event) {
    let key = event.key

    if (key === 'w') {
        keyPress['Up'] = true
    }
    if (key === 'a') {
        keyPress['Left'] = true
    }
    if (key === 's') {
        keyPress['Down'] = true
    }
    if (key === 'd') {
        keyPress['Right'] = true
    }
}

function keyUp(event) {
    let key = event.key
    
    if (key === 'w') {
        keyPress['Up'] = false 
    }
    if (key === 'a') {
        keyPress['Left'] = false
    }
    if (key === 's') {
        keyPress['Down'] = false
    }
    if (key === 'd') {
        keyPress['Right'] = false
    }
}

function rightClick() {
    return false
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(programLoop)
    }
}
