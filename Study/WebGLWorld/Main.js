window.onload = main

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl2')
    d = document.getElementById('Debug')
    glInit()

    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)
    window.addEventListener('mousedown', mouseDown, false)
    window.addEventListener('mousemove', mouseMove, false)
    window.addEventListener('mouseup', mouseUp, false)

    frameCurrent = Date.now()
    framePrevious = Date.now() - 16
    programLoop = requestAnimationFrame(loop)
}

function loop() {
    framePrevious = frameCurrent
    frameCurrent = Date.now()
    delta = frameCurrent - framePrevious 

    if (state === '') {
        moveCamera()
        render()
    }

    programLoop = requestAnimationFrame(loop)
}

function keyDown(event) {
    let key = event.key

    if (key === 'w') {
        keyPressed['Up'] = true
    }
    if (key === 'a') {
        keyPressed['Left'] = true
    }
    if (key === 's') {
        keyPressed['Down'] = true
    }
    if (key === 'd') {
        keyPressed['Right'] = true
    }
}

function keyUp(event) {
    let key = event.key

    if (key === 'w') {
        keyPressed['Up'] = false 
    }
    if (key === 'a') {
        keyPressed['Left'] = false
    }
    if (key === 's') {
        keyPressed['Down'] = false
    }
    if (key === 'd') {
        keyPressed['Right'] = false
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
        rotateCamera(diff)
    }

    mouse.x = x
    mouse.y = y
}

function mouseUp(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.clientX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.clientY - targetRect.top) / targetRect.height * canvas.height
    let button = event.button

    if (button === 0) {
        if (x > 0 && y > 0 && x < targetRect.width && y < targetRect.height) {
            if (state === 'Start') {
                state = ''
            }
        }
    }
}
