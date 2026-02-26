const arena = document.querySelector(".arena");

const gameBoard = function(){
    const board =
        [[0,0,0],
         [0,0,0],
         [0,0,0]];
    const xCoordinates = 0;
    const yCoordinates = 0;

    // winning conditions
    let row1Total = board[0][0] + board[0][1] + board[0][2]
    let row2Total = board[1][0] + board[1][1] + board[1][2]
    let row3Total = board[2][0] + board[2][1] + board[2][2]

    let column1Total = board[0][0] + board[1][0] + board[2][0]
    let column2Total = board[0][1] + board[1][1] + board[2][1]
    let column3Total = board[0][2] + board[1][2] + board[2][2]

    let diagonal1Total = board[0][0] + board[1][1] + board[2][2]
    let diagonal2Total = board[0][2] + board[1][1] + board[2][0]
}

arena.addEventListener("click", (e) => {
    if(e.target.classList.contains("position")) {
    }
    if(e.target.className.match(/x=/)) {
        console.log(Number(e.target.className.match(/x=\d/)[0][2]));
    }
    if(e.target.className.match(/y=/)) {
        console.log(Number(e.target.className.match(/y=\d/)[0][2]));
    }
})