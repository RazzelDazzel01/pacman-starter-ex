'use strict'

const GHOST = '&#9781;'

var gGhosts = []
let gDeadGhosts = []
var gIntervalGhosts

function createGhost(board) {
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: randomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for(var i = 0; i < 3; i++){
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    if (nextCell === PACMAN) {
        if (isPowered){
            const ghostIndex = gGhosts.indexOf(ghost)
            gGhosts.splice(ghostIndex, 1);
            gDeadGhosts.push(ghost)
            renderCell(ghost.location, EMPTY)
            
        }
        else{
            gameOver()
            return
        }
    }
    else{
        // model
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

        // DOM
        renderCell(ghost.location, ghost.currCellContent)

        // model
        ghost.location = nextLocation
        ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
        gBoard[ghost.location.i][ghost.location.j] = GHOST

        // DOM
        renderCell(ghost.location, getGhostHTML(ghost))
    }

}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0,  j: 1  }
        case 2: return { i: 1,  j: 0  }
        case 3: return { i: 0,  j: -1 }
        case 4: return { i: -1, j: 0  }
    }
}

function getGhostHTML(ghost) {
    return `<span style="color: ${ghost.color};">${GHOST}</span>`
}

function randomColor(){
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    return `rgb(${r},${g},${b})`
}

function changeGhostColor(){
    for (const ghost of gGhosts){
        ghost.color = randomColor()
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}

function reviveGhosts(){
    for (const ghost of gDeadGhosts){
        renderCell(ghost.location, getGhostHTML(ghost))
        gGhosts.push(ghost)
    }
    gDeadGhosts = []
}

function getGhostByCell(cell){
    for (const ghost of gGhosts){
        if (ghost.location.i === cell.i &&
            ghost.location.j === cell.j){
                return ghost
            }
    }
    return null
}