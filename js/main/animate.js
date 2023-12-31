//
// Import
//

import { boundaries, pellets, powerUps, createMap, updateMapCenter } from '../boundary.js';
import { keys, lastKey } from '../keyboardInput.js';
import { player } from '../player.js';
import { ghosts, getGhosts } from '../ghost.js';
import { showScoreMenu } from '../highScores/scoreDialog.js';
import { canvas, c, scoreEl, healthEl, musicBeginningEl, soundChompEl, soundDeathEl, soundEatFruitEl, soundEatGhostEl } from '../htmlGame.js';
import { restartScore, restartGhosts, restartPlayer } from '../restart.js'
import {
    arrowUpCollisionPlayer, arrowRightCollisionPlayer,
    arrowDownCollisionPlayer, arrowLeftCollisionPlayer, circleCollidesWithRectangle
} from './collisionMethods.js';
import { getMap } from '../map.js';

//
// Variables
//

// Score
export const score = {
    number: 0,
    increment(value) {
        this.number += value;
    },
    decrement(value) {
        this.number -= value;
    },
    getNumber() {
        return this.number;
    },
    setNumber(number) {
        this.number = number;
    }
};

// Lives
let lives = 3;
let pacmanImages = [];

function pushPacmanImages() {
    for (let i = 0; i < lives; i++) {
        pacmanImages.push('<img src="../assets/public/pacmanCharacter.png" alt="Pacman">');
    }
}

pushPacmanImages();

healthEl.innerHTML = pacmanImages.join("");

// Animation Id
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

// No Pause Menu
export let noPauseMenu = {
    boolean: false,
    getBoolean() {
        return this.boolean;
    },
    setBoolean(boolean) {
        this.boolean = boolean;
    }
}

// Other
export let currentLevel = 1;
let maxLevel = 2;
let isNextLevel = false;
let numPellets = 0;
let isHalfPellets = false;
let collisions = [];

setUpGame();

//
// Animate
//

const fps = 60
const msPerFrame = 1000 / fps
let msPrev = performance.now()

export function animate() {
    animationId.setId(requestAnimationFrame(animate));

    const msNow = performance.now()
    const msPassed = msNow - msPrev

    if (msPassed < msPerFrame) return

    const excessTime = msPassed % msPerFrame
    msPrev = msNow - excessTime

    c.clearRect(0, 0, canvas.width, canvas.height);

    // player movement
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') arrowUpCollisionPlayer();
    else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') arrowLeftCollisionPlayer();
    else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') arrowDownCollisionPlayer();
    else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') arrowRightCollisionPlayer();

    // player wins level
    if (pellets.length === 0 && !isNextLevel) {
        isNextLevel = true;
        currentLevel += 1

        if (currentLevel > maxLevel) {
            currentLevel--;
            showScoreMenu();
        } else {
            nextLevel();
            beginRound();
        }
    }

    // increase ghost speed when half pellets
    if (pellets.length === Math.floor(numPellets / 2) && !isHalfPellets) {
        isHalfPellets = true;
        // BUG ---> the speed ONLY updates when the ghost has to choose a direction
        // that's where we use the ghost.speed to dictate the speed of the ghost to go in a certain direction
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

                eatGhost();

                score.increment(200);
                scoreEl.innerHTML = score.getNumber();
            } else {
                // player collides with ghosts (loses)
                lives--;

                score.decrement(100);
                scoreEl.innerHTML = score.getNumber();

                if (lives === 0) {
                    playerDeath(true);
                    showScoreMenu();
                } else {
                    playerDeath(false);
                }
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

            soundEatFruitEl.play();

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

            soundChompEl.play();

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

// Call the beginRound() function after a short amount of time to wait for the map to load
setTimeout(() => {
    beginRound();
}, 50)

// Sets up a few things before starting the game
function setUpGame() {
    getGhosts(1)
    numPellets = pellets.length;
}

// Change ghosts, player, map for the next level
function nextLevel() {
    // redrawn map
    getMap(currentLevel);
    updateMapCenter();
    createMap();

    // set up variables for next level
    isHalfPellets = false;
    numPellets = pellets.length;

    restartPlayer();
    restartGhosts(currentLevel);

    isNextLevel = false;
}

// Restart all things needed like ghosts, player, map, variables
export function restartGame() {
    // reset health
    lives = 3;
    pacmanImages = [];
    pushPacmanImages();
    healthEl.innerHTML = pacmanImages.join("");

    restartScore();
    restartPlayer();
    restartGhosts(1);

    // redrawn map
    getMap(1);
    updateMapCenter();
    createMap();

    // reset variables
    isHalfPellets = false;
    currentLevel = 1;
    numPellets = pellets.length;

    animationId.setId(requestAnimationFrame(animate));
    setTimeout(() => {
        beginRound();
    }, 33)
}

// Cancels the animation frame and plays the beginning music
function beginRound() {
    noPauseMenu.setBoolean(true);

    cancelAnimationFrame(animationId.getId());

    musicBeginningEl.play();

    setTimeout(() => {
        animationId.setId(requestAnimationFrame(animate));

        noPauseMenu.setBoolean(false);
    }, musicBeginningEl.duration * 1000)
}

// Stops the game and resumes afterwards and plays a sound
function eatGhost() {
    cancelAnimationFrame(animationId.getId());

    soundEatGhostEl.play();

    setTimeout(() => {
        animationId.setId(requestAnimationFrame(animate));
    }, soundEatGhostEl.duration * 1000)
}

// Stops the game and resumes afterwards and plays a sound
function playerDeath(playerDead) {
    cancelAnimationFrame(animationId.getId());

    soundDeathEl.play();

    if (!playerDead) {
        setTimeout(() => {
            pacmanImages.pop();
            healthEl.innerHTML = pacmanImages.join("");

            restartPlayer();
            restartGhosts();

            animationId.setId(requestAnimationFrame(animate));
        }, soundDeathEl.duration * 1000)
    }
}
