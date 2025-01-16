const operPrior = {'*': 1, '/': 1, '+': 0, '-': 0, '^': 2, 'sin': 0, 'cos': 0, 'sqrt': 0}

function getFuncValue(f, v) {
    let postfix = []
    let stack = []
    let tempStr = ''

    for (let i = 0; i < f.length; i++) {
        if (f[i] in operPrior) {
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
            } else if (tempStr === 'sin') {
                stack.push('sin')
                stack.push('(')
                tempStr = ''
            } else if (tempStr === 'cos') {
                stack.push('cos')
                stack.push('(')
                tempStr = ''
            }  else if (tempStr === 'sqrt') {
                stack.push('sqrt')
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
            } else if (postfix[i] === 'sin') {
                stack[stack.length - 1] = Math.sin(stack[stack.length - 1])
            } else if (postfix[i] === 'cos') {
                stack[stack.length - 1] = Math.cos(stack[stack.length - 1])
            } else if (postfix[i] === 'sqrt') {
                stack[stack.length - 1] = Math.sqrt(stack[stack.length - 1])
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

function integral(f, v, start, end, step = 100) {
    let s = 0
    let param = {}
    param[v] = start
    console.log(param)

    for (let i = 0; i < step; i++) {
        param[v] = start + (end - start) / step * i
        s += getFuncValue(f, param) * (end - start) / step
    }

    return s
}

function onButtonClick() {
    let f = document.getElementById('Function').value
    let v = document.getElementById('Var').value
    let s = parseFloat(document.getElementById('Start').value)
    let e = parseFloat(document.getElementById('End').value)
    let step = parseInt(document.getElementById('Step').value)

    document.getElementById('Result').innerHTML = integral(f, v, s, e, step)
}