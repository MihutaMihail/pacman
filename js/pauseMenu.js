import { animate, restartGameLevelOne, playerDie } from './main/animate.js';

export let paused = false;

//
// Show Pause Menu
// 

document.addEventListener('keydown', function ({ key }) {
    if (key == 'Escape') {
        showPauseMenu();
        paused = true;
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
    paused = false;

    if (!playerDie.getDeath()) {
        animate();
    }
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
    hidePauseMenu();

    restartGameLevelOne();

    paused = false;
    animate();
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
