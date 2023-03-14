//to do:
// add an option to choose players
// refactor the code 
// animations on characters
// tweak sound volume

// DOM Constants
const restartConfirmMsg = document.getElementById("confirm-restart");
const msgLineOne = document.getElementById("msg-line-one");
const msgLineTwo = document.getElementById("msg-line-two");
const restartBtn = document.getElementById("restart-btn");
const yesRestartBtn = document.getElementById("yes-restart");
const goBackBtn = document.getElementById("no-cancel");
const startBtn = document.getElementById("start-btn");
const newGameBtn = document.getElementById("new-game-btn");
const gameEndScrn = document.getElementById("game-end-screen");
const gameModeScrn = document.getElementById("game-mode");
const gameModeBtn = document.getElementById("mode-btn");
const plVsPlBtn = document.getElementById("pl-vs-pl");
const plVsCompBtn = document.getElementById("pl-vs-comp");
const allButtons = document.querySelectorAll("button");

// Players' vitals
const pl1Name = document.getElementById("pl-one-name");
const pl1Health = document.getElementById("pl-one-health");
const pl1Strength = document.getElementById("pl-one-strength");
const pl1Supers = document.getElementById("pl-one-supers");
const pl2Name = document.getElementById("pl-two-name");
const pl2Health = document.getElementById("pl-two-health");
const pl2Strength = document.getElementById("pl-two-strength");
const pl2Supers = document.getElementById("pl-two-supers");

// audio control 
const backgroundAudio = document.getElementById("game-music");
const audioBtn = document.getElementById("music-btn");

// sound design
const superSlapSound = document.getElementById("super-slap-sound");
const slapSound = document.getElementById("slap-sound");
const startRoundSound = document.getElementById("start-round");
const buttonClickSound = document.getElementById("button-click");
const humanSurrSound = document.getElementById("human-surr");
const orcSurrSound = document.getElementById("orc-surr");
const orcCheerSound = document.getElementById("orc-cheer");
const humanCheerSound = document.getElementById("human-cheer");

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
let computerMode = false;
let isPaused = false;
let player1;
let player2;
let loser;
let winner;

// game control button event listeners
restartBtn.addEventListener("click", confirmRestart);
goBackBtn.addEventListener("click", cancelGoBack);
newGameBtn.addEventListener("click", newGame);
yesRestartBtn.addEventListener("click", startGame);
gameModeBtn.addEventListener("click", gameMode);
plVsPlBtn.addEventListener("click", startGame);
plVsCompBtn.addEventListener("click", startCompMode);


// player class
class Slapper {
    constructor(name) {
        this.name = name;
        this.strength = Math.floor(Math.random() * 11) + 10;
        this.health = 100;
        this.supers = 2;
    }
    slap(opponent) {
        let damage = this.strength;
        opponent.getSlapped(damage);
        slapSound.play();
        // slap to do damage to opponent
    }
    getSlapped(damage) {
        this.health -= damage;
        // health goes down by damage
    }
    superSlap(opponent) {
        superSlapSound.play();
        if (this.supers > 0) {
            let damageX = this.strength + Math.floor(Math.random() * 6) + 5;
            opponent.getSlapped(damageX);
            this.supers--;
            return damageX;
        }
        // adds to the base damage a strength of 5-10
    }
};

// players names and specs
function startGame() {
    player1 = new Slapper("Vinci");
    player2 = new Slapper("Zork");
    turn = 1;
    gameOver = false;
    computerMode = false;
    startRoundSound.play(); //doesn't play automatically in Chrome
    pl1Name.innerHTML = player1.name;
    pl2Name.innerHTML = player2.name;
    pl1Supers.innerHTML = player1.supers;
    pl1Strength.innerText = player1.strength;
    pl2Supers.innerHTML = player2.supers;
    pl2Strength.innerText = player2.strength;
    pl1Health.innerHTML = player1.health;
    pl2Health.innerHTML = player2.health;
    pl1SuperBtn.classList.remove("hide");
    pl1Btns.classList.remove("hide");
    pl2SuperBtn.classList.remove("hide");
    pl2Btns.classList.add("hide");
    restartConfirmMsg.classList.add("hide");
    msgLineOne.classList.remove("hide");
    msgLineTwo.classList.remove("hide");
    gameModeScrn.classList.add("hide");
    msgLineOne.innerHTML = `This is Power Slap, game on!`;
    msgLineTwo.innerHTML = `${player1.name} is up!`;
};

function startCompMode() {
    player1 = new Slapper("Vinci");
    player2 = new Slapper("Zork");
    turn = 1;
    gameOver = false;
    computerMode = true;
    startRoundSound.play();
    pl1Name.innerHTML = player1.name;
    pl2Name.innerHTML = player2.name;
    pl1Supers.innerHTML = player1.supers;
    pl2Supers.innerHTML = player2.supers;
    pl1Strength.innerText = player1.strength;
    pl2Strength.innerText = player2.strength;
    pl1Health.innerHTML = player1.health;
    pl2Health.innerHTML = player2.health;
    pl1SuperBtn.classList.remove("hide");
    pl1Btns.classList.remove("hide");
    pl2SuperBtn.classList.remove("hide");
    pl2Btns.classList.add("hide");
    restartConfirmMsg.classList.add("hide");
    msgLineOne.classList.remove("hide");
    msgLineTwo.classList.remove("hide");
    gameModeScrn.classList.add("hide");
    msgLineOne.innerHTML = `It's Player VS Computer mode! No mercy!`;
    msgLineTwo.innerHTML = ``;
};

//invoking this func in order to set the default game flow 
startGame();

// player action event listeners
pl1SlapBtn.addEventListener("click", clickSlap);
pl2SlapBtn.addEventListener("click", clickSlap);
pl1SuperBtn.addEventListener("click", clickSuperSlap);
pl2SuperBtn.addEventListener("click", clickSuperSlap);
pl1SurrBtn.addEventListener("click", (event) => surrender(event));
pl2SurrBtn.addEventListener("click", (event) => surrender(event));

function newGame() {
    startGame();
    startRoundSound.play();
    gameEndScrn.classList.add("hide");
    gameEndScrn.classList.remove("display-flex");
};

function clickSlap() {
    let slapper = turn % 2 ? player1 : player2;
    turn++;
    if (slapper === player1) {
        player1.slap(player2)
        if (!computerMode) {
            pl1Btns.classList.add("hide");
            pl2Btns.classList.remove("hide");
        }
        pl2Health.innerText = player2.health;
        checkPlayerHealth();
        msgLineOne.innerHTML = `${player1.name} did ${player1.strength} damage to ${player2.name}`;
        msgLineTwo.innerText = `Bit of a sloppy slap, do better next time!`;
        if (computerMode) {
            setTimeout(compSlap, 2000);
        }
    } else {
        player2.slap(player1)
        pl1Btns.classList.remove("hide");
        pl2Btns.classList.add("hide");
        pl1Health.innerText = player1.health;
        checkPlayerHealth();
        msgLineOne.innerHTML = `${player2.name} did ${player2.strength} damage to ${player1.name}`;
        msgLineTwo.innerText = `He survived! Next round!`;
    }
};

function clickSuperSlap() {
    let superSlapper = turn % 2 ? player1 : player2;
    turn++;
    if (superSlapper === player1) {
        let damageDone = player1.superSlap(player2);
        if (!computerMode) {
            pl1Btns.classList.add("hide");
            pl2Btns.classList.remove("hide"); 
        }
        pl2Health.innerText = player2.health;
        checkPlayerHealth();
        pl1Supers.innerHTML = player1.supers;
        msgLineOne.innerHTML = `${player1.name} did ${damageDone} damage to ${player2.name}`;
        msgLineTwo.innerText = `${player1.name} almost turned ${player2.name} into a walking dead!`;
        if (computerMode) {
            setTimeout(compSuperSlap, 2000);
        }
        if (player1.supers <= 0) {
            pl1SuperBtn.classList.add("hide");
        }
    } else {
        let damageDone = player2.superSlap(player1);
        pl1Btns.classList.remove("hide");
        pl2Btns.classList.add("hide");
        pl1Health.innerText = player1.health;
        checkPlayerHealth();
        pl2Supers.innerHTML = player2.supers;
        msgLineOne.innerHTML = `${player2.name} did ${damageDone} damage to ${player1.name}`;
        msgLineTwo.innerText = `Heavy hitter!`;
        
        if (player2.supers <= 0) {
            pl2SuperBtn.classList.add("hide");
        }
    }
};

function confirmRestart() {
    restartConfirmMsg.classList.remove("hide");
    msgLineOne.classList.add("hide");
    msgLineTwo.classList.add("hide");
};


function cancelGoBack() {
    restartConfirmMsg.classList.add("hide");
    msgLineOne.classList.remove("hide");
    msgLineTwo.classList.remove("hide");
};

function checkPlayerHealth() {
    if (player1.health <= 0 || player2.health <= 0) {
        setTimeout(gameEnd, 2000);
    };
};

function surrender(event) {
    if (event.target === pl1SurrBtn) {
        winner = player2;
        loser = player1;
        humanSurrSound.play();
    } else {
        winner = player1;
        loser = player2;
        orcSurrSound.play();
    }
    gameOver = true;
    setTimeout(gameEnd, 2000);
    msgLineOne.innerHTML = `Oh no, ${loser.name} chickened out!`;
    msgLineTwo.innerHTML = `${winner.name} slapped his way into the Hall of Fame!`;
};

function gameEnd() {
    gameOver = true;
    gameEndScrn.classList.remove("hide");
    gameEndScrn.classList.add("display-flex");
    msgLineOne.innerHTML = `Game Over! No more slappin' today!`;
    msgLineTwo.innerHTML = `Gotta go watch some UFC...`;
};

function gameMode() {
    gameModeScrn.classList.remove("hide");
};

function compSlap() {
    turn++;
    player2.slap(player1);
    checkPlayerHealth();
    pl1Health.innerText = player1.health;
    msgLineOne.innerHTML = `${player2.name} did ${player2.strength} damage to ${player1.name}`;
    msgLineTwo.innerText = `Is that it? ${player1.name} seen worse!`;
};

function compSuperSlap() {
    turn++;
    let damageDone = player2.superSlap(player1);   
    checkPlayerHealth();
    pl1Health.innerText = player1.health;
    pl2Supers.innerHTML = player2.supers; // need to work on display of superslaps count
    msgLineOne.innerHTML = `${player2.name} did ${damageDone} damage to ${player1.name}`;
    msgLineTwo.innerText = `Dentist is on the way!`;
    if (player2.supers <= 0) {
        pl2SuperBtn.classList.add("hide");
    }
};

        
       
