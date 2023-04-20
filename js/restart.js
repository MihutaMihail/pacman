//
// Restart Functions
// 

import { score } from './main/animate.js';
import { scoreEl } from './html.js';
import { player } from './player.js'
import { ghosts, getGhosts } from './ghost.js';

// Restart Score
export function restartScore() {
    score.setNumber(0);
    scoreEl.innerHTML = score.getNumber();
}

// Restart Player
export function restartPlayer() {
    player.velocity.x = 0;
    player.velocity.y = 0;
    player.rotation = 0;
    player.update(true);
}

// Restart Ghosts
export function restartGhosts(level) {
    switch(level) {
        case 1:
            getGhosts(1);
            break;
        case 2:
            getGhosts(2);
            break;
    }

    ghosts.forEach(ghost => {
        ghost.velocity.x = 0;
        ghost.velocity.y = 0;
        ghost.speed = 1;
        ghost.prevCollisions = [];
        ghost.scared = false;
        ghost.update(true);
        ghost.velocity.x = ghost.speed;
    })
}