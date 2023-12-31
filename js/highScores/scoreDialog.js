import { score, currentLevel, animationId, restartGame, noPauseMenu} from '../main/animate.js';
import { setItemPlayerScore } from './setLocalStorage.js'

let playerName = '';
export let playerScore = {};

document.querySelector('#playerNameSubmit').addEventListener('click', function () {
    playerName = playerNameInput.value;

    if (playerName.length < 3) {
        alert("Your name must be longer than 2 characters !");
    } else {
        playerScore = {
            namePlayer: playerName,
            scorePlayer: score.getNumber(),
            levelPlayer: currentLevel
        };
    
        setItemPlayerScore();
    
        document.querySelector('#playerNameDialog').style.display = 'none';
        noPauseMenu.setBoolean(false);
        restartGame();
    }
});

// Show score menu
export function showScoreMenu() {
    noPauseMenu.setBoolean(true);
    document.getElementById('playerNameDialog').style.display = 'block';
    cancelAnimationFrame(animationId.getId());
}