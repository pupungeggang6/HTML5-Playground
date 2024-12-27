window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    context = canvas.getContext('2d')

    canvas.addEventListener('mouseup', mouseUp, false)
    board = createBoard()
    boardSelected = resetBoard()

    gameLoop = requestAnimationFrame(loop)
}

function loop() {
    render()
    gameLoop = requestAnimationFrame(loop)
}

function render() {
    context.clearRect(0, 0, 400, 400)
    context.lineWidth = 2

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 10; j++) {
            if (board[i][j] === 0) {
                context.fillStyle = 'Red'
            } else if (board[i][j] === 1) {
                context.fillStyle = 'Yellow'
            } else if (board[i][j] === 2) {
                context.fillStyle = 'Green'
            } else if (board[i][j] === 3) {
                context.fillStyle = 'Blue'
            } else {
                context.fillStyle = 'White'
            }
            context.fillRect(j * 40, 40 + i * 40, 40, 40)
        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 10; j++) {
            context.strokeRect(j * 40, 40 + i * 40, 40, 40)
        }
    }

    context.fillStyle = 'Black'
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 10; j++) {
            if (boardSelected[i][j] === 1) {
                context.fillRect(j * 40, 40 + i * 40, 40, 40)
            }
        }
    }
}

function mouseUp(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.clientX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.clientY - targetRect.top) / targetRect.height * canvas.height
    let button = event.button

    if (button === 0) {
        let row = Math.floor((y - 40) / 40)
        let col = Math.floor(x / 40)
        console.log(row, col)

        if (row === -1) {
            board = createBoard()
            boardSelected = resetBoard()
        } else {
            if (boardSelected[row][col] === 1) {
                board = popBlock(board, boardSelected)
                boardSelected = resetBoard()
            } else {
                boardSelected = findNeighbor(board, row, col)['Board']
                neighborNum = findNeighbor(board, row, col)['Num']
            }
        }
    }
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        alert(`${url}|${err.toString()}|${line}`)
    }
}

function rightClick() {
    return false
}