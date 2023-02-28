// DOM Constants
const restartConfirmMsg = document.getElementById("confirm-restart");
const msgLineOne = document.getElementById("msg-line-one");
const msgLineTwo = document.getElementById("msg-line-two");
const restartBtn = document.getElementById("restart-btn");
const goBackBtn = document.getElementById("no-cancel");
const startBtn = document.getElementById("start-btn");
const pl1Health = document.getElementById("pl-one-health");
const pl1Strength = document.getElementById("pl-one-strength");
const pl1SurrBtn = document.getElementById("pl-one-surr-btn");
const pl1SlapBtn = document.getElementById("pl-one-slap-btn");
const pl1SuperBtn = document.getElementById("pl-one-super-btn");
const pl2Health = document.getElementById("pl-two-health");
const pl2Strength = document.getElementById("pl-two-strength");
const pl2SurrBtn = document.getElementById("pl-two-surr-btn");
const pl2SlapBtn = document.getElementById("pl-two-slap-btn");
const pl2SuperBtn = document.getElementById("pl-two-super-btn");

// global game variables 
let gameOver = false;
let turn = 1;
let playerVsPlayerMode = true;
let loser;
let winner;

// game control button event listeners
restartBtn.addEventListener("click", confirmRestart);
goBackBtn.addEventListener("click", cancelGoBack);
startBtn.addEventListener("click", gameStart);


// player class
class Slapper {
    constructor(name, strength) {
        this.name = name;
        this.strength = strength;
        this.health = 100;
    }
    slap(opponent) {
        let damage = this.strength;
        console.log(`${this.name} did ${damage} damage to the ${opponent.name} and left him with ${opponent.health} HP`);
        opponent.getSlapped(damage)
        // slap to do damage to opponent
    }
    getSlapped(damage) {
        this.health -= damage;
        // health goes down by damage
    }
    superSlap() {
        damage *= 2;
        opponent.getSlapped(damage)
        //multiplies the damage dealt twice
    }
};

// players names and specs
const player1 = new Slapper("Fafa", Math.floor(Math.random() * 21) + 5);
const player2 = new Slapper("Murchello", Math.floor(Math.random() * 11) + 2);
console.log(`${player1.strength} and ${player2.strength}`);

// player action event listeners
pl1SlapBtn.addEventListener("click", clickSlap);
pl2SlapBtn.addEventListener("click", clickSlap);
pl1SuperBtn.addEventListener("click", player1.superSlap);
pl2SuperBtn.addEventListener("click", player2.superSlap);
pl1SurrBtn.addEventListener("click", surrender);
pl2SurrBtn.addEventListener("click", surrender);

function gameStart() {
    console.log("start game....")

};

function clickSlap() {
    let slapper = turn % 2 ?  player1 : player2;
    turn++
    if(slapper === player1) {
        player1.slap(player2)
        // toggle player1 btns to hide and vv
        // toggle messages on the bottom
        // update healthDOM
    } else {
        player2.slap(player1)
    }
}

function confirmRestart()  {
    restartConfirmMsg.classList.remove("hide")
    msgLineOne.classList.add("hide")
    msgLineTwo.classList.add("hide")
};

function cancelGoBack()  {
    restartConfirmMsg.classList.add("hide")
    msgLineOne.classList.remove("hide")
    msgLineTwo.classList.remove("hide")
};

function checkPlayerHealth(player) {
        if(player.health <= 0) {
        gameEnd();
          loser = player.name;
    }
};

function surrender(player) {
    gameEnd()
    loser = player.name;
    msgLineOne.innerHTML = `Oh no, ${player.name} chickened out!`;
    msgLineTwo.innerHTML = `${player.name} slapped his way into Hall of Fame!`
};

function resetGame() {

};

function gameEnd(player) {
    if(player1.health <= 0 || player2.health <= 0) {
        gameOver = true;
        msgLineOne.innerHTML = `Game Over! ${player.name} wins!`
        resetGame()
    }
    // DOM manipulation to display game end message
};





// gameflow control 
// while (!gameOver) {
    //if(turn % 2){
    //
   // }
//     player1.slap(player2);
//     checkPlayerHealth(player2)
//     turn++ 
// }