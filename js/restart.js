//
// Restart Functions
// 

import { score } from './main/animate.js';
import { scoreEl } from './html.js';
import { player } from './player.js'
import { playerDie } from './main/animate.js';
import { ghosts, getGhostsLevelOne } from './ghost.js';

export function restartScore() {
    score.setNumber(0);
    scoreEl.innerHTML = score.getNumber();
}

export function restartPlayer() {
    player.velocity.x = 0;
    player.velocity.y = 0;
    player.rotation = 0;
    player.update(true);
    playerDie.setDeath(false);
}

export function restartGhosts() {
    getGhostsLevelOne();

    ghosts.forEach(ghost => {
        ghost.velocity.x = 0;
        ghost.velocity.y = 0;
        ghost.prevCollisions = [];
        ghost.scared = false;
        ghost.update(true);
        ghost.velocity.x = ghost.speed;
    })
}