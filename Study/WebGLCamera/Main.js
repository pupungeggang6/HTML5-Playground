window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl2')

    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)
    window.addEventListener('mousedown', mouseDown, false)
    window.addEventListener('mouseup', mouseUp, false)
    window.addEventListener('mousemove', mouseMove, false)
    glInit()

    frameCurrent = Date.now()
    framePrevious = Date.now() - 16
    gameLoop = requestAnimationFrame(loop)
}

function loop() {
    framePrevious = frameCurrent
    frameCurrent = Date.now()
    delta = frameCurrent - framePrevious

    if (state === '') {
        playerMove()
        renderInit()
        render()
    }

    gameLoop = requestAnimationFrame(loop)
}

function keyDown(event) {
    let key = event.key

    if (state === '') {
        if (key === 'ArrowUp') {
            cameraRotate.x += 0.1
        }
        if (key === 'ArrowDown') {
            cameraRotate.x += -0.1
        }
        if (key === 'ArrowLeft') {
            cameraRotate.y += 0.1
        }
        if (key === 'ArrowRight') {
            cameraRotate.y += -0.1
        }

        direction.forward = rotateForward(cameraRotate.y)
        direction.left = rotateForward(cameraRotate.y + Math.PI * 0.5) 
        direction.backward = rotateForward(cameraRotate.y + Math.PI) 
        direction.right = rotateForward(cameraRotate.y + Math.PI * 1.5)
    }

    if (event.key === 'w') {
        keyPressed['Up'] = true 
    }
    if (event.key === 'a') {
        keyPressed['Left'] = true
    }
    if (event.key === 's') {
        keyPressed['Down'] = true
    }
    if (event.key === 'd') {
        keyPressed['Right'] = true
    }
}

function keyUp(key) {
    if (event.key === 'w') {
        keyPressed['Up'] = false
    }
    if (event.key === 'a') {
        keyPressed['Left'] = false
    }
    if (event.key === 's') {
        keyPressed['Down'] = false
    }
    if (event.key === 'd') {
        keyPressed['Right'] = false
    }
}

function mouseUp(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.clientX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.clientY - targetRect.top) / targetRect.height * canvas.height
    let button = event.button

    if (button === 0) {
        if (state === 'Start') {
            mouse.x = x
            mouse.y = y
            state = ''
        }
    }
}

function mouseDown(event) {
}

function mouseMove(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.clientX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.clientY - targetRect.top) / targetRect.height * canvas.height

    if (state === '') {
        let diff = {x: x - mouse.x, y: y - mouse.y}
        rotateCamera(diff.x, diff.y)
    }
   
    mouse.x = x
    mouse.y = y
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(loop)
    }
}

function rightClick() {
    return false
}
