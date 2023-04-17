//
// Animate
//

import { boundaries, pellets, powerUps }                        from '../boundary.js';
import { keys, lastKey }                                        from '../keyboardInput.js';
import { player }                                               from '../player.js';
import { ghosts }                                               from '../ghost.js';
import { canvas, c, scoreEl }                                   from '../html.js';
import { arrowUpCollisionPlayer, arrowRightCollisionPlayer, 
         arrowDownCollisionPlayer, arrowLeftCollisionPlayer, circleCollidesWithRectangle } from './collisionMethods.js';

let score = 0;
let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') arrowUpCollisionPlayer();
    else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft')  arrowLeftCollisionPlayer();
    else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') arrowDownCollisionPlayer();
    else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') arrowRightCollisionPlayer();

    // win condition
    if (pellets.length === 0) {
        cancelAnimationFrame(animationId);
        // next level / faster ghosts / etc
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
                } else {
                    cancelAnimationFrame(animationId);
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
            ) 
        {
            powerUps.splice(i, 1);

            // make ghosts scared
            ghosts.forEach(ghost => {
                ghost.scared = true;

                setTimeout(() => {
                    ghost.scared = false;
                }, 5000)
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
            ) 
        {
            pellets.splice(i, 1);
            score += 10;
            scoreEl.innerHTML = score;
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
        ){
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    })

    player.update();

    // update ghosts + check collision
    ghosts.forEach(ghost => {
        ghost.update();

        // check if ghost is colliding with boundary
        const collisions = [];
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
            ){
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
            ){
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
            ){
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
            ){
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
                case 'up' :
                    ghost.velocity.y = -ghost.speed;
                    ghost.velocity.x = 0;
                    break;
                case 'right' :
                    ghost.velocity.y = 0;
                    ghost.velocity.x = ghost.speed;
                    break;
                case 'left' :
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
