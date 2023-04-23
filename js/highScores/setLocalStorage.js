import { highScore, allScoresList, getAllScoresList, getHighScore } from './getLocalStorage.js'
import { playerScore } from './scoreDialog.js'

export function setItemPlayerScore() {
    setHighScore();
    setAllScoresList();
}

// Stocks player's score in local storage ---> highScore Key
function setHighScore() {
    getHighScore();

    if (highScore !== null) {
        if (playerScore.scorePlayer > highScore.scorePlayer) {
            localStorage.setItem("highScore", JSON.stringify(playerScore));
        }
    } else {
        localStorage.setItem("highScore", JSON.stringify(playerScore));
    }
}

// Stocks player's score in local storage ---> allScoresList Key
function setAllScoresList() {
    getAllScoresList();

    allScoresList.push(playerScore);

    if (allScoresList.length > 8) {
        allScoresList.shift();
    }

    localStorage.setItem("allScoresList", JSON.stringify(allScoresList));
}
