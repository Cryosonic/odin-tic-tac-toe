// Document manipulation
const scoreBoard = (() => {
    const round = document.getElementById("round-counter");
    const player1ScoreCounter = document.getElementById("p1-score-counter");
    const player2ScoreCounter = document.getElementById("p2-score-counter");
 

    const player1WinRound = (player1Score) => {
        player1ScoreCounter.textContent = player1Score;
    }

    const player2WinRound = (player2Score) => {
        player2ScoreCounter.textContent = player2Score;
    }

    const nextRound = (currentRound) => {
        round.textContent = currentRound;
    }

    const resetScoreBoard = (currentRound, player1Score, player2Score) => {
        round.textContent = currentRound;
        player1ScoreCounter.textContent = player1Score;
        player2ScoreCounter.textContent = player2Score;
    }

    return {player1WinRound, player2WinRound, nextRound, resetScoreBoard};
})()

const gameArena = (() => {
    const arena = document.getElementById("arena");
    const positions = document.querySelectorAll(".position");

    const setPlayer1Color = (color) => {
        arena.style.setProperty("--player-one-color", color);
    }

    const setPlayer2Color = (color) => {
        arena.style.setProperty("--player-two-color", color);
    }

    const placeMarker = (marker, background, targetNode) => {
        const markerContainer = document.createElement("img");
        markerContainer.setAttribute("src", marker);
        markerContainer.style.backgroundColor = background;
        targetNode.appendChild(markerContainer);
    }

    const resetArea = () => {
        positions.forEach(node => {
            node.innerHTML = "";
        })
    }

    arena.addEventListener("click", (e) => {
        if(e.target.classList.contains("position")) {
            const xCoordinate = e.target.className.match(/x=\d/)[0][2];
            const yCoordinate = e.target.className.match(/y=\d/)[0][2];
            gameBoard.takeTurn(e.target, xCoordinate, yCoordinate);
        }
    })

    return {placeMarker, setPlayer1Color, setPlayer2Color, resetArea};
})();

const playerOne = (() => {
    let name = "Player 1";
    const p1NameDisplay = document.getElementById("p1-name")
    const p1NameInput = document.getElementById("p1-name-input");
    const p1NameBtn = document.getElementById("set-p1");
    const marker = "./images/naught.png";
    const markerColor = "red";  // TODO: update background colour for p1
    let roundScore = 0;

    const updatePlayerName = () => {
        if (p1NameInput.classList.contains("hidden")) {
            p1NameInput.classList.remove("hidden");
            p1NameDisplay.textContent = "";
            p1NameBtn.textContent = "Confirm Player 1 Name"
        } else {
            if (!p1NameInput.value) {
                p1NameDisplay.textContent = "Player 1";
            } else {
                name = p1NameInput.value;
                p1NameDisplay.textContent = name;
            }
            p1NameInput.classList.add("hidden");
            p1NameBtn.textContent = "Change Player 1 Name"
        }
    }

    const getName = () => {
        return name;
    }

    const winRound = () => {
        roundScore++;
        scoreBoard.player1WinRound(roundScore);
    }

    const resetScore = () => {const
        roundScore = 0;
        return roundScore;
    }

    p1NameBtn.addEventListener("click", updatePlayerName);

    gameArena.setPlayer1Color(markerColor);

    return {marker, getName, winRound, resetScore};
})();

const playerTwo = (() => {
    let name = "Player 2";
    const p2NameDisplay = document.getElementById("p2-name");
    const p2NameInput = document.getElementById("p2-name-input");
    const p2NameBtn = document.getElementById("set-p2");
    const marker = "./images/cross.png";
    const markerColor = "blue"; // TODO: update background colour for p2
    let roundScore = 0;

    const updatePlayerName = () => {
        if (p2NameInput.classList.contains("hidden")) {
            p2NameInput.classList.remove("hidden");
            p2NameDisplay.textContent = "";
            p2NameBtn.textContent = "Confirm Player 2 Name"
        } else {
            if (!p2NameInput.value) {
                p2NameDisplay.textContent = "Player 2";
            } else {
                name = p2NameInput.value;
                p2NameDisplay.textContent = name;
            }
            p2NameInput.classList.add("hidden");
            p2NameBtn.textContent = "Change Player 2 Name"
        }
    }

    const getName = () => {
        return name;
    }

    const winRound = () => {
        roundScore++
        scoreBoard.player2WinRound(roundScore);
    }

    const resetScore = () => {
        roundScore = 0;
        return roundScore;
    }

    p2NameBtn.addEventListener("click", updatePlayerName);

    gameArena.setPlayer2Color(markerColor);

    return {marker, getName, winRound, resetScore}
})();

const endRoundDisplay = (() => {
    const endRoundContainer = document.getElementById("end-round-container");
    const announcement = document.getElementById("announcement");
    const nextRoundBtn = document.getElementById("next-round")
    const resetBtn = document.getElementById("reset-game");

    const hideBtns = () => {
        endRoundContainer.style.display = "none";
    }

    const endRound = (winningPlayer) => {
        endRoundContainer.style.display = "grid";
        announcement.textContent = `${winningPlayer} wins this round!`;
    }

    nextRoundBtn.addEventListener("click", () => {
        hideBtns();
        gameBoard.resetBoard();
    });

    resetBtn.addEventListener("click", ()=>{
        hideBtns();
        gameBoard.resetGame();
    })

    return endRound;
})();


// Game engine
const gameBoard = (() => {
    const board =
        [[0,0,0],
         [0,0,0],
         [0,0,0]];
    let whosTurn = "player1";
    let currentRound = 1;
    let turn = 0;
    let roundFinished = false;

    const getCurrentConditions = () => {
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

    const takeTurn = (target ,x, y) => {
        if(board[x][y] === 0 && !roundFinished) {
            if (whosTurn === "player1") {
                board[x][y] = 1;
                gameArena.placeMarker(playerOne.marker, "var(--player-one-color)", target)
                whosTurn = "player2";
            } else if(whosTurn === "player2") {
                board[x][y] = -1;
                gameArena.placeMarker(playerTwo.marker, "var(--player-two-color)", target)
                whosTurn = "player1"
            }
            turn++
            if (turn === 9) {
                roundFinished = true;
                endRoundDisplay("Tie! No one ");
            }
            // TODO: Tie condition

            getCurrentConditions().some(total =>{
                if(total === 3) {
                    roundFinished = true;
                    playerOne.winRound();
                    endRoundDisplay(playerOne.getName());
                    return;
                } else if (total === -3) {
                    roundFinished = true;
                    playerTwo.winRound();
                    endRoundDisplay(playerTwo.getName());
                    return;
                }
            })
        }
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j=0; j < board[i].length; j++) {
                board[i][j] = 0;
            }
        }
        whosTurn = "player1";
        roundFinished = false;
        currentRound++
        turn = 0;
        scoreBoard.nextRound(currentRound);
        gameArena.resetArea();
    }

    const resetGame = () => {
        resetBoard();
        currentRound = 1;
        scoreBoard.resetScoreBoard(currentRound, playerOne.resetScore(), playerTwo.resetScore())
    }

    return {takeTurn, resetBoard, resetGame};
})();