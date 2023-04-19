import { animate, animationId, restartGame } from './main/animate.js';

//
// Show Pause Menu
// 

document.addEventListener('keydown', function ({ key }) {
    if (key == 'Escape') {
        showPauseMenu();
        cancelAnimationFrame(animationId.getId());
    }
});

function showPauseMenu() {
    document.getElementById('pause-menu').style.display = 'block';
}

//
// Resume Game
// 

document.getElementById('resume-button').addEventListener('click', function () {
    resumeGame();
});

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

function returnMainMenu() {
    window.open('index.html', '_self');
}  
