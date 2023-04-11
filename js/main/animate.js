//
// Animate
//

import { boundaries, pellets, powerUps }                      from '../boundary.js';
import { keys, lastKey }                            from '../keyboardInput.js';
import { player }                                   from '../player.js';
import { ghosts }                                   from '../ghost.js';
import { canvas, c, scoreEl }                       from '../html.js';
import { arrowUpCollisionPlayer, arrowRightCollisionPlayer, arrowDownCollisionPlayer, arrowLeftCollisionPlayer, circleCollidesWithRectangle } from './collisionTools.js';

let score = 0;
let animationId;

function animate() {
    // create loop
    animationId = requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        arrowUpCollisionPlayer();
    } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        arrowLeftCollisionPlayer();
    } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        arrowDownCollisionPlayer();
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        arrowRightCollisionPlayer();
    }


    // collisions between ghost and player
    for (let i = ghosts.length - 1; 0 <= i; i--) {
        const ghost = ghosts[i];

        // ghost touches player
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

    // draw power ups + check collisions
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

    // draw pellets + check collisions
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

    // draw boundaries + check collisions
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

    // update ghosts + check collisions
    ghosts.forEach(ghost => {
        ghost.update();

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

        if (collisions.length > ghost.prevCollisions.length)
            ghost.prevCollisions = collisions; 

        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
            else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
            else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
            else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

            const pathways = ghost.prevCollisions.filter((collision 
            ) => {
                return !collisions.includes(collision);
            })

            const direction = pathways[Math.floor(Math.random() * pathways.length)]

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

} 

animate();
