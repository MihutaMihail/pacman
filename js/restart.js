//
// Restart Functions
// 

import { score } from './main/animate.js';
import { scoreEl } from './htmlGame.js';
import { player } from './player.js'
import { ghosts, getGhosts } from './ghost.js';

// Set score to 0
export function restartScore() {
    score.setNumber(0);
    scoreEl.innerHTML = score.getNumber();
}

// Set player position and velocity to default values
export function restartPlayer() {
    player.velocity.x = 0;
    player.velocity.y = 0;
    player.rotation = 0;
    player.update(true);
}

// Set player position and velocity to default values (depending on which level you give it)
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
        // add a new property to indicate in which direction you want the ghost to start and do a switch
        // if you want to switch the direction of which the ghost is going at the start of the round
        ghost.velocity.x = ghost.speed;
    })
}