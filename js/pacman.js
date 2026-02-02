'use strict'

const PACMAN = '😷';

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return

    if (nextCell === FOOD) {
        food--
        updateScore(1)
    }

    else if (nextCell === CHERRY)
        updateScore(10)

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper){
            return
        }
        updateScore(1)
        changeGhostColor()
        gPacman.isSuper = true


        setTimeout(() => {
            gPacman.isSuper = false
            reviveGhosts()
        }, 5000);
    }

    else if (nextCell === GHOST) {
        if (gPacman.isSuper){
            const ghost = getGhostByCell(nextLocation)
            if (ghost === null){
                console.log("something went wrong getting ghost")
            }
            else{
                const ghostIndex = gGhosts.indexOf(ghost)
                gGhosts.splice(ghostIndex, 1);
                gDeadGhosts.push(ghost)
                renderCell(nextLocation, EMPTY)
            }
        }
        else{
            console.log(isPowered)
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }

    // adds empty cell to list
    emptyArr.push(nextLocation)

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}