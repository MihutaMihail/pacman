import { highScoreListEl, allScoresListEl } from '../htmlHighScore.js'

export let highScore = {};
export let allScoresList = [];

export function getHighScore() {
    highScore = JSON.parse(localStorage.getItem("highScore"));
}

export function getAllScoresList() {
    allScoresList = JSON.parse(localStorage.getItem("allScoresList")) || [];
}

// shows high score
function getItemHighScore() {
    const highScore = JSON.parse(localStorage.getItem('highScore'));

    if (highScoreListEl && highScore) {
        highScoreListEl.innerHTML = '';

        const highestScoreItem = document.createElement('li');
        highestScoreItem.textContent = highScore.namePlayer + highScore.scorePlayer + highScore.levelPlayer;
        highScoreListEl.appendChild(highestScoreItem);

    } else if (highScoreListEl) {
        const highestScoreItem = document.createElement('li');
        highestScoreItem.textContent = 'No high score yet';
        highScoreListEl.appendChild(highestScoreItem);
    }
}

// shows all scores list
function getItemAllScoresList() {
    const allScoresList = JSON.parse(localStorage.getItem('allScoresList'));

    if (allScoresListEl && allScoresList) {

        allScoresListEl.innerHTML = '';

        for (let i = 0; i < allScoresList.length; i++) {
            const allScoreItem = document.createElement('li');
            allScoreItem.textContent = allScoresList[i].namePlayer + allScoresList[i].scorePlayer + allScoresList[i].levelPlayer;
            allScoresListEl.appendChild(allScoreItem);
        }

    } else if (allScoresListEl) {
        const allScoreItem = document.createElement('li');
        allScoreItem.textContent = 'No scores yet';
        allScoresListEl.appendChild(allScoreItem);
    }
}

getItemHighScore();
getItemAllScoresList();