import { animate, animationId, restartGame, noPauseMenu } from './main/animate.js';

//
// Show Pause Menu
// 

document.addEventListener('keydown', function ({ key }) {
    if (key == 'Escape') {
        if (!noPauseMenu.getBoolean()) {
            showPauseMenu();
            cancelAnimationFrame(animationId.getId());
        }
    }
});

// Shows pause menu
function showPauseMenu() {
    document.getElementById('pause-menu').style.display = 'block';
}

//
// Resume Game
// 

document.getElementById('resume-button').addEventListener('click', function () {
    resumeGame();
});

// Resumes game
function resumeGame() {
    hidePauseMenu();

    animationId.setId(requestAnimationFrame(animate));
}

function hidePauseMenu() {
    document.querySelector('#pause-menu').style.display = 'none';
}

//
// Restart Game
// 

document.querySelector('#restart-button').addEventListener('click', function () {
    restartGameButton();
});

// Restart game
function restartGameButton() {
    resumeGame();
    restartGame();
}

//
// Return to Main Menu
// 

document.querySelector('#main-menu-button').addEventListener('click', function () {
    returnMainMenu();
});

// Return to main menu
function returnMainMenu() {
    window.open('index.html', '_self');
}  
