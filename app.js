// DOM Constants
const restartConfirmMsg = document.getElementById("confirm-restart");
const msgLineOne = document.getElementById("msg-line-one");
const msgLineTwo = document.getElementById("msg-line-two");
const restartBtn = document.getElementById("restart-btn");
const goBackBtn = document.getElementById("no-cancel");

// global game variables 
let gameOver = false;
let playerTurn = 1;
let playerVsPlayerMode = true;
let loser;
let winner;


// Button event listeners
restartBtn.addEventListener("click", confirmRestart);
goBackBtn.addEventListener("click", cancelGoBack);

// player class
class Slapper {
    constructor(name, strength) {
        this.name = name;
        this.strength = strength;
        this.health = 100;
    }
    slap(opponent) {
        // slap to do damage to opponent
        // opponent.getSlapped(damage)
    }
    getSlapped(damage) {
        // health goes down by damage
        // this.health -= damage
    }
}

function confirmRestart()  {
    restartConfirmMsg.classList.remove("hide")
    msgLineOne.classList.add("hide")
    msgLineTwo.classList.add("hide")
}

function cancelGoBack()  {
    restartConfirmMsg.classList.add("hide")
    msgLineOne.classList.remove("hide")
    msgLineTwo.classList.remove("hide")
}

function checkPlayerHealth(player) {
    // if(player.health <= 0) {
    //  gameEnd();
    //  loser = player;
    // }
}

function gameEnd() {
    // gameOver = true;
    // DOM manipulation to display game end messages
    // Message box will say: Game Over! PlayerX Wins!
}

// gameflow control 
// while (!gameOver) {
    //gameflow control goes here
// }