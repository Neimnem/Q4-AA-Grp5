const panels = document.querySelectorAll(".panel");
const startButton = document.getElementById("start");
const colors = ["yellow", "green", "blue", "red"];
let sequence = [];
let playerSequence = [];
let level = 0;
let canClick = false;

// Function to flash a panel
function flashPanel(color) {
    const panel = document.querySelector(`.${color}`);
    panel.style.opacity = "0.5";
    setTimeout(() => {
        panel.style.opacity = "1";
    }, 500);
}

// Function to play the sequence
function playSequence() {
    canClick = false;
    playerSequence = [];
    let i = 0;
    
    const interval = setInterval(() => {
        flashPanel(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            canClick = true;
        }
    }, 1000);
}

// Function to generate a new sequence step
function nextSequence() {
    if (level < 5) {  // Limiting to 5 steps for Easy Mode
        sequence.push(colors[Math.floor(Math.random() * 4)]);
        level++;
        playSequence();
    } else {
        alert("🎉 Congratulations! You completed Easy Mode!");
        resetGame();
    }
}

// Function to check player's input
function checkInput(index) {
    if (playerSequence[index] !== sequence[index]) {
        alert("Game Over! You made a mistake.");
        resetGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        setTimeout(nextSequence, 1000);
    }
}

// Function to handle player clicks
panels.forEach((panel) => {
    panel.addEventListener("click", () => {
        if (!canClick) return;

        const color = panel.dataset.color;
        flashPanel(color);
        playerSequence.push(color);
        checkInput(playerSequence.length - 1);
    });
});

// Function to reset the game
function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    canClick = false;
}

// Function to start the game
function startGame() {
    alert("Get ready! The game is starting!");
    resetGame();
    nextSequence();
}

// Start game on button click
startButton.addEventListener("click", startGame);