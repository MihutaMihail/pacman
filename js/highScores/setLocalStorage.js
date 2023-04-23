import { highScore, allScoresList, getAllScoresList, getHighScore } from './getLocalStorage.js'
import { playerScore } from './scoreDialog.js'

export function setItemPlayerScore() {
    setHighScore();
    setAllScoresList();
}

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

function setAllScoresList() {
    getAllScoresList();

    allScoresList.push(playerScore);

    if (allScoresList.length > 8) {
        allScoresList.shift();
    }

    localStorage.setItem("allScoresList", JSON.stringify(allScoresList));
}
