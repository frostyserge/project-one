// DOM Constants
const restartConfirmMsg = document.getElementById("confirm-restart");
const msgLineOne = document.getElementById("msg-line-one");
const msgLineTwo = document.getElementById("msg-line-two");
const restartBtn = document.getElementById("restart-btn");
const yesRestartBtn = document.getElementById("yes-restart");
const goBackBtn = document.getElementById("no-cancel");
const startBtn = document.getElementById("start-btn");

// Players' vitals
const pl1Health = document.getElementById("pl-one-health");
const pl1Strength = document.getElementById("pl-one-strength");
const pl2Health = document.getElementById("pl-two-health");
const pl2Strength = document.getElementById("pl-two-strength");

// Player 1 control buttons
const pl1Btns = document.getElementById("pl-one-btns");
const pl1SurrBtn = document.getElementById("pl-one-surr-btn");
const pl1SlapBtn = document.getElementById("pl-one-slap-btn");
const pl1SuperBtn = document.getElementById("pl-one-super-btn");

// Player 2 control buttons
const pl2Btns = document.getElementById("pl-two-btns");
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
yesRestartBtn.addEventListener("click", yesRestartGame);


// player class
class Slapper {
    constructor(name) {
        this.name = name;
        this.strength = Math.floor(Math.random() * 21) + 5;
        this.health = 100;
    }
    slap(opponent) {
        let damage = this.strength;
        console.log(`${this.name} did ${damage} damage to ${opponent.name} and left him with ${opponent.health} HP`);
        opponent.getSlapped(damage)
        // slap to do damage to opponent
    }
    getSlapped(damage) {
        this.health -= damage;
        // health goes down by damage
    }
    superSlap(opponent) {
        let damageX = this.strength += Math.floor(Math.random() * 6) + 5;
        opponent.getSlapped(damageX)
        //multiplies the damage dealt by 2
    }
};

// players names and specs
const player1 = new Slapper("Fafa")
const player2 = new Slapper("Murchello");
console.log(`Fafa ${player1.strength} and Murchello ${player2.strength}`);

// player action event listeners
pl1SlapBtn.addEventListener("click", clickSlap);
pl2SlapBtn.addEventListener("click", clickSlap);
pl1SuperBtn.addEventListener("click", clickSuperSlap);
pl2SuperBtn.addEventListener("click", clickSuperSlap);
pl1SurrBtn.addEventListener("click", (event) => surrender(event));
pl2SurrBtn.addEventListener("click", (event) => surrender(event));

function gameStart() {
    console.log("start game....")

};

function clickSlap() {
    let slapper = turn % 2 ? player1 : player2;
    turn++;
    if (slapper === player1) {
        player1.slap(player2)
        pl1Btns.classList.add("hide");
        pl2Btns.classList.remove("hide");
        pl2Health.innerText = player2.health;
        checkPlayerHealth();
        msgLineTwo.innerText = `Player 2, it's you now!`;
        // toggle player1 btns to hide and vice versa
        // update healthDOM
        // toggle messages on the bottom
    } else {
        player2.slap(player1)
        pl1Btns.classList.remove("hide");
        pl2Btns.classList.add("hide");
        pl1Health.innerText = player1.health;
        checkPlayerHealth();
        msgLineTwo.innerText = `Player 1 survived! Next round!`;
    }
};

function clickSuperSlap() {
    let superSlapper = turn % 2 ? player1 : player2;
    turn++;
    if (superSlapper === player1) {
        player1.superSlap(player2);

    }
};

function confirmRestart() {
    restartConfirmMsg.classList.remove("hide");
    msgLineOne.classList.add("hide");
    msgLineTwo.classList.add("hide");
};

function yesRestartGame() {
    gameEnd();
    resetGame();
}

function cancelGoBack() {
    restartConfirmMsg.classList.add("hide");
    msgLineOne.classList.remove("hide");
    msgLineTwo.classList.remove("hide");
};

function checkPlayerHealth() {
    if (player1.health <= 0 || player2.health <= 0) {
        gameEnd();
    };
};

function surrender(event) {
    if(event.target === pl1SurrBtn) {
        winner = player2;
        loser = player1;
    } else {
        winner = player1;
        loser = player2;
    }
    gameOver = true;
    gameEnd();
    resetGame(); //just displaye a message about game over
    msgLineOne.innerHTML = `Oh no, ${loser.name} chickened out!`;
    msgLineTwo.innerHTML = `${winner.name} slapped his way into the Hall of Fame!`;
};
// to do later: 
//set message line one and two to default
//manipulate players' health so it adjusts to game conditions in DOM
function resetGame() {
    turn = 1;
    gameOver = false;
    pl1Btns.classList.remove("hide");
    pl2Btns.classList.add("hide");
    restartConfirmMsg.classList.add("hide");
    msgLineOne.classList.remove("hide");
    msgLineTwo.classList.remove("hide");  
    pl1Health.innerHTML = "100"; 
    pl2Health.innerHTML = "100";
    player1.strength = Math.floor(Math.random() * 21) + 5;
    player2.strength = Math.floor(Math.random() * 21) + 5;
};

function gameEnd() {
    if (player1.health <= 0 || player2.health <= 0) {
        resetGame();
        gameOver = true;
        msgLineOne.innerHTML = `Game Over! ${name} wins!`;
        msgLineTwo.innerHTML = `Player 1, you are up!`;
    }
    // grey out screen, dont start a new game right away
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