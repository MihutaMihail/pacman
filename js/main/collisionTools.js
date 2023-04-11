//
// Player Collision w/ Boundary
//

export function circleCollidesWithRectangle({ circle, rectangle }) {
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
        );
}

//
// Arrow Keys Collisions
//

import { boundaries }       from '../boundary.js';
import { player }           from '../player.js';

// Arrow Up
export function arrowUpCollision() {
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
}

// Arrow Right
export function arrowRightCollision() {
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

// Arrow Down
export function arrowDownCollision() {
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
}

// Arrow Left
export function arrowLeftCollision() {
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
}