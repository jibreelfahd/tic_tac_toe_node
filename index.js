/* Importing the readline and file -system module */
const { writeFile} = require('fs');
const path = require('path');
const { createInterface } = require('node:readline/promises');
const readline = createInterface({
   input: process.stdin,
   output: process.stdout
});

/* Cells for creating the board */
let startCells = [
  ' ', ' ', ' ',
  ' ', ' ', ' ',
  ' ', ' ', ' ', ' '
];

let currentPlayer = 'X';

/* Creating the gameboard */
function createBoard() {
   console.log('\n' +
    ' ' + startCells[1] + ' | ' + startCells[2] + ' | ' + startCells[3] + '\n' +
    ' ---------\n' +
    ' ' + startCells[4] + ' | ' + startCells[5] + ' | ' + startCells[6] + '\n' +
    ' ---------\n' +
    ' ' + startCells[7] + ' | ' + startCells[8] + ' | ' + startCells[9] + '\n');
}

/* Adding items to gameboard */
function addItem(rows) {
  if (startCells[rows] === ' ') {
    startCells[rows] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

/* Check player who won */
function checkWin(player) {
   const winPermutation = [
      [0,1,2], 
      [3,4,5], 
      [6,7,8], 
      [0,3,6], 
      [1,4,7], 
      [2,5,8], 
      [0,4,8], 
      [2,4,6] 
   ];
   let count = 0;
   for (let i = 0; i < winPermutation.length; i++) {
     count = 0;
     for (let j = 0; j < winPermutation[i].length; j++) {
       if (startCells[winPermutation[i][j]] === player) {
         count++;
       }
       if (count === 3) {
         return true
       }
     }
   }
   return false
}

/* Saving the game */
function saveGame(filename) {
   const currentSave = { startGame, currentPlayer };
   writeFile(filename, currentSave);
 }

/* Starting the game */
async function startGame() {
   while (true) {
      createBoard();
      const move = await readline.question('Enter a move from (1 - 9): ');
      addItem(move);

      if (checkWin(currentPlayer) !== false) {
         createBoard();
         currentPlayer = currentPlayer === 'X'? 'O': 'X'
         console.log(`Player ${currentPlayer} wins!`);
         break;
      }

      //saving the file
      // saveGame(path.join(__dirname, 'node_js_tic_tac_toe', 'saveFile.txt'))
   }
}
startGame();
