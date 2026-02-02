'use strict'

const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '*'
const EMPTY = ' '
const CHERRY = '@'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
let msg 
let food = 56
let emptyArr = []
let cheryInterval

function init() {
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    msg = document.querySelector(".msg")
    cheryInterval = setInterval(() => {
        setCherry()
    }, 15000);
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }


        }
    }
    board[2][2] = SUPER_FOOD
    board[1][board.length-2] = SUPER_FOOD
    board[board.length-2][1] = SUPER_FOOD
    board[board.length-3][board.length-3] = SUPER_FOOD
    return board
}

function updateScore(diff) {
    if (diff === 0)
        gGame.score = 0
    
    else{
        gGame.score += diff
        if (food === 0){
            setMsgTitle("Victorious")
            gameOver()
        }
    }
    
    document.querySelector('h2 span').innerText = gGame.score
}

function setCherry(){
    if (emptyArr.length === 0)
        return
    const rnd = Math.floor(Math.random() * emptyArr.length)
    const cell = emptyArr[rnd]
    gBoard[cell.i][cell.j] = CHERRY
    renderCell(cell, CHERRY)
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)

    msg.style.display = "block"
}

function restartGame(){
    msg.style.display = "none"
    setMsgTitle("Game Over")
    updateScore(0)
    init()
}

function setMsgTitle(txt){
    const title = msg.querySelector(".msg-title")
    title.textContent = txt
}

