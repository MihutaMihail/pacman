//
// Import
//

import { boundaries, pellets, powerUps, createMap } from '../boundary.js';
import { keys, lastKey } from '../keyboardInput.js';
import { player } from '../player.js';
import { ghosts, getGhosts } from '../ghost.js';
import { canvas, c, scoreEl, healthEl, musicBeginningEl, soundChompEl, soundDeathEl, soundEatFruitEl, soundEatGhostEl } from '../html.js';
import { restartScore, restartGhosts, restartPlayer } from '../restart.js'
import {
    arrowUpCollisionPlayer, arrowRightCollisionPlayer,
    arrowDownCollisionPlayer, arrowLeftCollisionPlayer, circleCollidesWithRectangle
} from './collisionMethods.js';
import { getMap } from '../map.js';

//
// Variables
//

export const score = {
    number: 0,
    increment(value) {
        this.number += value;
    },
    getNumber() {
        return this.number;
    },
    setNumber(number) {
        this.number = number;
    }
};

export const health = {
    numHealth: 2,
    decrement(value) {
        this.numHealth -= value;
    },
    getHealth() {
        return this.numHealth;
    },
    setHealth(health) {
        this.numHealth = health;
    }
};

export const animationId = {
    id: 0,
    getId() {
        return this.id;
    },
    setId(id) {
        cancelAnimationFrame(this.id);
        this.id = id;
    }
}

let currentLevel = 1;
let isNextLevel = false;
let numPellets = 0;
let isHalfPellets = false;
let collisions = [];

setUpGame();

//
// Animate
//

export function animate() {
    animationId.setId(requestAnimationFrame(animate));

    c.clearRect(0, 0, canvas.width, canvas.height);

    // player movement
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') arrowUpCollisionPlayer();
    else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') arrowLeftCollisionPlayer();
    else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') arrowDownCollisionPlayer();
    else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') arrowRightCollisionPlayer();

    // player wins level
    if (pellets.length === 60 && !isNextLevel) {
        isNextLevel = true;
        currentLevel += 1

        //nextLevel();
    }

    // increase ghost speed when half pellets
    if (pellets.length === Math.floor(numPellets / 2) && !isHalfPellets) {
        isHalfPellets = true;
        // BUG ---> a ghost may get their speed increase at a later time than other ghosts
        ghosts.forEach(ghost => {
            ghost.speed += 1;
        });
    }

    // collision between ghost and player
    for (let i = ghosts.length - 1; 0 <= i; i--) {
        const ghost = ghosts[i];

        if (Math.hypot(
            ghost.position.x - player.position.x,
            ghost.position.y - player.position.y
        ) <
            ghost.radius + player.radius
        ) {
            if (ghost.scared) {
                ghosts.splice(i, 1);
                score.increment(200);
                scoreEl.innerHTML = score.getNumber();
            } else {
                // player loses
                // lostLife();
                //
                cancelAnimationFrame(animationId.getId());
                health.decrement(1);
                healthEl.innerHTML = health.getHealth();
                //
            }
        }
    }

    // draw power ups + check collision
    for (let i = powerUps.length - 1; 0 <= i; i--) {
        const powerUp = powerUps[i];
        powerUp.draw();

        if (Math.hypot(
            powerUp.position.x - player.position.x,
            powerUp.position.y - player.position.y
        ) <
            powerUp.radius + player.radius
        ) {
            powerUps.splice(i, 1);

            // make ghosts scared
            ghosts.forEach(ghost => {
                clearTimeout(ghost.timeoutId);

                ghost.scared = true;
                ghost.timeoutId = setTimeout(() => {
                    ghost.scared = false;
                    ghost.timeoutId = false;
                }, 2000)
            })
        }
    }

    // draw pellets + check collision
    for (let i = pellets.length - 1; 0 <= i; i--) {
        const pellet = pellets[i];
        pellet.draw();

        if (Math.hypot(
            pellet.position.x - player.position.x,
            pellet.position.y - player.position.y
        ) <
            pellet.radius + player.radius
        ) {
            pellets.splice(i, 1);

            score.increment(10);
            scoreEl.innerHTML = score.getNumber();
        }
    }

    // draw boundaries + check collision
    boundaries.forEach((boundary) => {
        boundary.draw();

        if (
            circleCollidesWithRectangle({
                circle: player,
                rectangle: boundary
            })
        ) {
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    })

    player.update();

    // update ghosts + check collision
    ghosts.forEach(ghost => {
        ghost.update(false);

        // check if ghost is colliding with boundary
        collisions = [];
        boundaries.forEach(boundary => {
            if (
                !collisions.includes('right') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: ghost.speed,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ) {
                collisions.push('right');
            }

            if (
                !collisions.includes('left') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: -ghost.speed,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ) {
                collisions.push('left');
            }

            if (
                !collisions.includes('up') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: 0,
                            y: -ghost.speed
                        }
                    },
                    rectangle: boundary
                })
            ) {
                collisions.push('up');
            }

            if (
                !collisions.includes('down') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: 0,
                            y: ghost.speed
                        }
                    },
                    rectangle: boundary
                })
            ) {
                collisions.push('down');
            }
        })

        // check if ghost has collided with a new boundary 
        if (collisions.length > ghost.prevCollisions.length)
            ghost.prevCollisions = collisions;

        // check if a new path has opened
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            // add the direction of the ghost as a pathway that it can take
            if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
            else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
            else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
            else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

            // find potential pathway(s) for ghost
            const pathways = ghost.prevCollisions.filter((prevCollision
            ) => {
                return !collisions.includes(prevCollision);
            })

            // choose a random path as the ghost's direction
            const direction = pathways[Math.floor(Math.random() * pathways.length)]

            // based on the path chosen, move into that direction
            switch (direction) {
                case 'down':
                    ghost.velocity.y = ghost.speed;
                    ghost.velocity.x = 0;
                    break;
                case 'up':
                    ghost.velocity.y = -ghost.speed;
                    ghost.velocity.x = 0;
                    break;
                case 'right':
                    ghost.velocity.y = 0;
                    ghost.velocity.x = ghost.speed;
                    break;
                case 'left':
                    ghost.velocity.y = 0;
                    ghost.velocity.x = -ghost.speed;
                    break;
            }

            ghost.prevCollisions = [];
        }
    })

    // rotate player in the direction that it's facing
    if (player.velocity.x > 0) player.rotation = 0
    else if (player.velocity.x < 0) player.rotation = Math.PI
    else if (player.velocity.y > 0) player.rotation = Math.PI / 2
    else if (player.velocity.y < 0) player.rotation = Math.PI * 1.5
}

animate();

// this function will be called every time that the player loses a life / restart / lost game
// function newRound() {
//     cancelAnimationFrame(animationId);

//     // play sound beginning
//     musicBeginningEl.play();

//     setTimeout(() => {
//         animate();
//     }, musicBeginningEl.duration * 1000)
// }

/*function lostLife() {
    restartPlayer();
    restartGhosts();

    // remove a life
    lives -= 1;
    livesEl.innerHTML = lives;

    if (lives == 0) {
        restartGameLevelOne();
    }
}*/

function setUpGame() {
    // get ghosts level one
    getGhosts(1)

    // get number pellets
    numPellets = pellets.length;

    // set health counter
    healthEl.innerHTML = health.getHealth();
}

export function restartGame() {
    // reset health
    health.setHealth(2);
    healthEl.innerHTML = health.getHealth();

    // restart half pellets entry
    isHalfPellets = false;

    restartScore();
    restartPlayer();
    restartGhosts();

    // redrawn map
    getMap(1);
    createMap();
}

// function nextLevel() {
//     restartPlayer();
//     restartGhosts();
    
//     // redrawn map
//     getMap(currentLevel);
//     createMap();
// }