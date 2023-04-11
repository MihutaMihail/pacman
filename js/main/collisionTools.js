//
// Player Collision w/ Boundary
//

import { Boundary }       from '../boundary.js';

export function circleCollidesWithRectangle({ circle, rectangle }) {
    const padding = Boundary.width / 2 - circle.radius - 1;
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding
        );
}

//
// Arrow Keys Collisions
//

import { boundaries }       from '../boundary.js';
import { player }           from '../player.js';

// Arrow Up
export function arrowUpCollisionPlayer() {
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
export function arrowRightCollisionPlayer() {
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
export function arrowDownCollisionPlayer() {
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
export function arrowLeftCollisionPlayer() {
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