import { highScoreNameEl, highScoreScoreEl, highScoreLevelEl, allScoresTableEl } from '../htmlHighScore.js'

export let highScore = {};
export let allScoresList = [];

export function getHighScore() {
    highScore = JSON.parse(localStorage.getItem("highScore"));
}

export function getAllScoresList() {
    allScoresList = JSON.parse(localStorage.getItem("allScoresList")) || [];
}

// Shows high score on html page
function getItemHighScore() {
    const highScore = JSON.parse(localStorage.getItem('highScore'));

    if (highScoreNameEl && highScore) {
        highScoreNameEl.textContent = highScore.namePlayer;
        highScoreScoreEl.textContent = highScore.scorePlayer;
        highScoreLevelEl.textContent = highScore.levelPlayer;
    }
}

// Shows all scores list on html page
function getItemAllScoresList() {
    const allScoresList = JSON.parse(localStorage.getItem('allScoresList'));

    if (allScoresTableEl && allScoresList) {

        for (let i = 0; i < allScoresList.length; i++) {
            const allScoreItem = document.createElement('tr');
            const allScoreName = document.createElement('td');
            const allScoreScore = document.createElement('td');
            const allScoreLevel = document.createElement('td');
      
            allScoreName.textContent = allScoresList[i].namePlayer;
            allScoreScore.textContent = allScoresList[i].scorePlayer;
            allScoreLevel.textContent = allScoresList[i].levelPlayer;
      
            allScoreItem.appendChild(allScoreName);
            allScoreItem.appendChild(allScoreScore);
            allScoreItem.appendChild(allScoreLevel);
      
            allScoresTableEl.appendChild(allScoreItem);
          }
    }
}

getItemHighScore();
getItemAllScoresList();