function drawInit() {
    context.lineWidth = 2
    context.clearRect(0, 0, 800, 600)
    context.setTransform(1, 0, 0, -1, 400, 300)
    context.clearRect(-400, -300, 800, 600)
    contextNumber.font = '16px Opensans'
    contextNumber.clearRect(0, 0, 800, 600)
}

function drawAxis() {
    drawInit()
    context.beginPath()
    context.moveTo(-400, 0)
    context.lineTo(400, 0)
    context.stroke()
    context.beginPath()
    context.moveTo(0, -300)
    context.lineTo(0, 300)
    context.stroke()

    for (let i = -9; i <= 9; i++) {
        contextNumber.fillText(i, i * 40 + 396, 308)
    }
    
    for (let i = -7; i <= 7; i++) {
        contextNumber.fillText(-i, 396, i * 40 + 308)
    }
}

function plot() {
    let txt = document.getElementById('ExprText').value
    let lineMode = false
    drawInit()
    drawAxis()
    for (let i = 0; i < 1000; i++) {
        let x = -10 + 20 * i / 1000
        let y = getFuncValue(txt, {'x': x})
        let point = toGraphCoord({x: x, y: y})
        if (y > -10 && y < 10) {
            if (lineMode === false) {
                lineMode = true
                context.beginPath()
                context.moveTo(point.x, point.y)
            } else {
                context.lineTo(point.x, point.y)
            }
        } else {
            if (lineMode === true) {
                lineMode = false
                context.stroke()
            }
        }
    }
    context.stroke()
}

function getFuncValue(f, v) {
    let postfix = []
    let stack = []
    let tempStr = ''

    for (let i = 0; i < f.length; i++) {
        if (i === 0 && f[i] === '-') {
            stack.push('!')
        } else if (f[i] in operPrior) {
            if (tempStr.length > 0) {
                postfix.push(tempStr)
                tempStr = ''
            }

            if (stack.length === 0) {

            } else {
                while (stack.length > 0) {
                    let last = stack[stack.length - 1]

                    if (operPrior[last] >= operPrior[f[i]]) {
                        postfix.push(stack.pop())
                    } else {
                        break
                    }
                }
            }
            stack.push(f[i])
        } else if (f[i] === '(') {
            if (tempStr.length === 0) {
                stack.push('(')
            } else if (tempStr === 'sqrt') {
                stack.push('sqrt')
                stack.push('(')
                tempStr = ''
            } else if (tempStr === 'sin') {
                stack.push('sin')
                stack.push('(')
                tempStr = ''
            } else if (tempStr === 'cos') {
                stack.push('cos')
                stack.push('(')
                tempStr = ''
            } else if (tempStr === 'tan') {
                stack.push('tan')
                stack.push('(')
                tempStr = ''
            } else if (tempStr === 'asin') {
                stack.push('asin')
                stack.push('(')
                tempStr = ''
            } else if (tempStr === 'acos') {
                stack.push('acos')
                stack.push('(')
                tempStr = ''
            } else if (tempStr === 'atan') {
                stack.push('atan')
                stack.push('(')
                tempStr = ''
            }
        } else if (f[i] === ')') {
            if (tempStr.length > 0) {
                postfix.push(tempStr)
                tempStr = ''
            }

            while (stack.length > 0) {
                let last = stack[stack.length - 1]

                if (last === '(') {
                    stack.pop()
                    break
                }

                postfix.push(stack.pop())
            }
        } else {
            tempStr += f[i]
        }
    }

    if (tempStr.length > 0) {
        postfix.push(tempStr)
        tempStr = ''
    }

    while(stack.length > 0) {
        postfix.push(stack.pop())
    }

    stack = []

    for (let i = 0; i < postfix.length; i++) {
        if (postfix[i] in operPrior) {
            if (postfix[i] === '+') {
                stack[stack.length - 2] += stack[stack.length - 1]
                stack.pop()
            } else if (postfix[i] === '-') {
                stack[stack.length - 2] -= stack[stack.length - 1]
                stack.pop()
            } else if (postfix[i] === '*') {
                stack[stack.length - 2] *= stack[stack.length - 1]
                stack.pop()
            } else if (postfix[i] === '/') {
                stack[stack.length - 2] /= stack[stack.length - 1]
                stack.pop()
            } else if (postfix[i] === '^') {
                stack[stack.length - 2] = Math.pow(stack[stack.length - 2], stack[stack.length - 1])
                stack.pop()
            } else if (postfix[i] === '!') {
                stack[stack.length - 1] = -stack[stack.length - 1]
            } else if (postfix[i] === 'sqrt') {
                stack[stack.length - 1] = Math.sqrt(stack[stack.length - 1])
            } else if (postfix[i] === 'sin') {
                stack[stack.length - 1] = Math.sin(stack[stack.length - 1])
            } else if (postfix[i] === 'cos') {
                stack[stack.length - 1] = Math.cos(stack[stack.length - 1])
            } else if (postfix[i] === 'tan') {
                stack[stack.length - 1] = Math.tan(stack[stack.length - 1])
            } else if (postfix[i] === 'asin') {
                stack[stack.length - 1] = Math.asin(stack[stack.length - 1])
            } else if (postfix[i] === 'acos') {
                stack[stack.length - 1] = Math.acos(stack[stack.length - 1])
            } else if (postfix[i] === 'atan') {
                stack[stack.length - 1] = Math.atan(stack[stack.length - 1])
            }
        } else {
            if (!isNaN(postfix[i])) {
                stack.push(parseFloat(postfix[i]))
            } else {
                stack.push(v[postfix[i]])
            }
        }
    }

    return stack[0]
}

function toGraphCoord(point) {
    return {x: point.x * 40, y: point.y * 40}
}
