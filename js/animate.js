//
// Animate
//

import { boundaries }   from './boundary.js';
import { keys }         from './keyboardInput.js';
import { lastKey }      from './keyboardInput.js';
import { player }       from './player.js';
import { canvas }       from './base.js';
import { c }            from './base.js';

function circleCollidesWithRectangle({ circle, rectangle }) {
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
        );
}

function animate() {
    // create loop
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, 
                        velocity: {
                            x: 0,
                            y: -5
                        }
                    },
                    rectangle: boundary
                })
            ) {
                player.velocity.y = 0;
                break;
            } else {
                player.velocity.y = -5;
            }
        }
    } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, 
                        velocity: {
                            x: -5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ) {
                player.velocity.x = 0;
                break;
            } else {
                player.velocity.x = -5;
            }
        }
    } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, 
                        velocity: {
                            x: 0,
                            y: 5
                        }
                    },
                    rectangle: boundary
                })
            ) {
                player.velocity.y = 0;
                break;
            } else {
                player.velocity.y = 5;
            }
        }
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, 
                        velocity: {
                            x: 5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ) {
                player.velocity.x = 0;
                break;
            } else {
                player.velocity.x = 5;
            }
        }
    }

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
} 

animate();
