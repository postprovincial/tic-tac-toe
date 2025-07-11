document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".gameCell");
    let currentPlayer = "X";
    const board = Array(9).fill("");
    let gameActive = true;

    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    const checkVictor = () => {
        for (const combo of winningCombos){
            const [a,b,c] = combo;
            if(
                board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                return board[a];
            }
        }
        return null;
    }

    cells.forEach((cells, index) => {
        cells.addEventListener("click", () => {
            if(board[index] !=="") return; //cell is already filled

            //updates board state
            board[index] = currentPlayer;
            cells.textContent = currentPlayer;

            const victor = checkVictor();
            if (victor) {
                alert(`${victor} wins!`);
                gameActive = false;
                return;
            }

            if(!board.includes("")) {
                alert("It's a tie!");
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
        })
    })

    const restartButton = document.getElementById("restartButton");

    restartButton.addEventListener("click", () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";                  // Clear board state
            cells[i].textContent = "";     // Clear cell content
        }
    
        currentPlayer = "X";               // Reset to X
        gameActive = true;                 // Reactivate game
    })
})