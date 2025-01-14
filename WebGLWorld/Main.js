window.onload = main

function main() {
    canvas = document.getElementById('Screen')
    gl = canvas.getContext('webgl2')
    glInit()

    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)
    window.addEventListener('mousemove', mouseMove, false)

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

function mouseMove(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.clientX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.clientY - targetRect.top) / targetRect.height * canvas.height
    
    if (state === 'Start') {
        state = ''
    } else {
        let diff = {x: x - mouse.x, y: y - mouse.y}
        mouse.x = x
        mouse.y = y
    }
}
