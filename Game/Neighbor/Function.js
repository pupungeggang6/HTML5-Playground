function createBoard() {
    let tempBoard = []
    for (let i = 0; i < 9; i++) {
        let temp = []
        for (let j = 0; j < 10; j++) {
            temp.push(Math.floor(Math.random() * 4))
        }
        tempBoard.push(temp)
    }

    return tempBoard
}

function resetBoard() {
    let tempBoard = []
    for (let i = 0; i < 9; i++) {
        let temp = []
        for (let j = 0; j < 10; j++) {
            temp.push(0)
        }
        tempBoard.push(temp)
    }

    return tempBoard
}

const dataDirection = [
    [-1, 0], [0, -1], [0, 1], [1, 0]
]

function findNeighbor(board, row, col) {
    let tempBoard = resetBoard()
    let visited = resetBoard()
    let num = 0
    let queue = [[row, col]]
    let color = board[row][col]

    while (queue.length > 0) {
        let first = queue[0]
        visited[first[0]][first[1]] = 1
        tempBoard[first[0]][first[1]] = 1
        num += 1
        for (let i = 0; i < dataDirection.length; i++) {
            let tempRow = first[0] + dataDirection[i][0]
            let tempCol = first[1] + dataDirection[i][1]
            if (tempRow >= 0 && tempCol >= 0 && tempRow < 9 && tempCol < 10) {
                if (board[tempRow][tempCol] === color && visited[tempRow][tempCol] === 0) {
                    queue.push([tempRow, tempCol])
                }
            }
        }
        queue.shift()
    }

    return {'Board': tempBoard, 'Num': num}
}

function popBlock(board, selected) {
    for (let i = 0; i < selected.length; i++) {
        for (let j = 0; j < selected[i].length; j++) {
            if (selected[i][j] === 1) {
                board[i][j] = -1
            }
        }
    }

    for (let i = 0; i < board.length - 1; i++) {
        board = handleFall(board)
    }

    boardRefill(board)

    return board
}

function handleFall(board) {
    for (let i = board.length - 2; i >= 0; i--) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i + 1][j] === -1) {
                let temp = board[i + 1][j]
                board[i + 1][j] = board[i][j]
                board[i][j] = temp
            }
        }
    }

    return board
}

function boardRefill(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === -1) {
                board[i][j] = Math.floor(Math.random() * 4)
            }
        }
    }
}