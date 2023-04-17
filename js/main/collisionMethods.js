//
// Circle (player,ghost) Collision w/ Rectangle (boundary)
//

import { Boundary }       from '../boundary.js';

export function circleCollidesWithRectangle({ circle, rectangle }) {
    const collisionMargin = (Boundary.width / 2) - circle.radius - 1;
  
    const circleTop = circle.position.y - circle.radius + circle.velocity.y;
    const circleRight = circle.position.x + circle.radius + circle.velocity.x;
    const circleBottom = circle.position.y + circle.radius + circle.velocity.y;
    const circleLeft = circle.position.x - circle.radius + circle.velocity.x;

    const rectTop = rectangle.position.y - collisionMargin;
    const rectRight = rectangle.position.x + rectangle.width + collisionMargin;
    const rectBottom = rectangle.position.y + rectangle.height + collisionMargin;
    const rectLeft = rectangle.position.x - collisionMargin;

    return (
      circleTop <= rectBottom &&
      circleRight >= rectLeft &&
      circleBottom >= rectTop &&
      circleLeft <= rectRight
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
                        y: -4
                    }
                },
                rectangle: boundary
            })
        ) {
            player.velocity.y = 0;
            break;
        } else {
            player.velocity.y = -4;
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
                        x: 4,
                        y: 0
                    }
                },
                rectangle: boundary
            })
        ) {
            player.velocity.x = 0;
            break;
        } else {
            player.velocity.x = 4;
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
                        y: 4
                    }
                },
                rectangle: boundary
            })
        ) {
            player.velocity.y = 0;
            break;
        } else {
            player.velocity.y = 4;
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
                        x: -4,
                        y: 0
                    }
                },
                rectangle: boundary
            })
        ) {
            player.velocity.x = 0;
            break;
        } else {
            player.velocity.x = -4;
        }
    }
}
