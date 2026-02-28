// Document manipulation
const gameArena = function() {
    const arena = document.querySelector(".arena");
    const markerShape = document.createElement("img");
    const updateArena = function(shape, target) {
        markerShape.src = shape;
    }
    
}

const scoreBoard = function() {
    const currentRound = 0;
    // update document for p1
    let player1Score = 0;
    // update document for p2
    let player2Score = 0;
}

const playerOne = function() {
    let name = "player1"
    const marker = "./images/naught.png";
    const markerColor = "red";
    let roundScore = 0;
}

const playerTwo = function() {
    let name = "player2"
    const marker = "./images/cross.png";
    const markerColor = "blue";
    let roundScore = 0;
}


// Game engine
const gameBoard = function(){
    const board =
        [[0,0,0],
         [0,0,0],
         [0,0,0]];
    let whosTurn = "player1";

    const getCurrentConditions = function() {
        let row1Total = board[0][0] + board[0][1] + board[0][2]
        let row2Total = board[1][0] + board[1][1] + board[1][2]
        let row3Total = board[2][0] + board[2][1] + board[2][2]

        let column1Total = board[0][0] + board[1][0] + board[2][0]
        let column2Total = board[0][1] + board[1][1] + board[2][1]
        let column3Total = board[0][2] + board[1][2] + board[2][2]

        let diagonal1Total = board[0][0] + board[1][1] + board[2][2]
        let diagonal2Total = board[0][2] + board[1][1] + board[2][0]

        return [row1Total, row2Total, row3Total, column1Total, column2Total, column3Total, diagonal1Total, diagonal2Total];
    }

    const placeMarker = function(x, y) {
        if(board[x][y] === 0) {
            updateArena(x, y)
            // place marker on document
            // update board
            
            if (whosTurn === "player1") {
                board[x][y] = 1;
                whosTurn = "player2";
            } else if(whosTurn === "player2") {
                board[x][y] = -1;
                whosTurn = "player1"
            }

            getCurrentConditions().some(total =>{
                if(total === 3) {
                    return playerOne.name;
                } else if (total === -3) {
                    return playerTwo.name;
                }
            })
        }
    }
}

arena.addEventListener("click", (e) => {
    if(e.target.classList.contains("position")) {
        const xCoordinate = e.target.className.match(/x=\d/)[0][2];
        const yCoordinate = e.target.className.match(/y=\d/)[0][2];
        gameBoard.placeMarker(xCoordinate, yCoordinate);
    }
})