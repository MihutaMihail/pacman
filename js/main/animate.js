//
// Animate
//

import { boundaries }       from '../boundary.js';
import { keys, lastKey }    from '../keyboardInput.js';
import { player }           from '../player.js';
import { canvas, c }        from '../canvas.js';
import { arrowUpCollision, arrowRightCollision, arrowDownCollision, arrowLeftCollision, circleCollidesWithRectangle } from './collisionTools.js';

function animate() {
    // create loop
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        arrowUpCollision();
    } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        arrowLeftCollision();
    } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        arrowDownCollision();
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        arrowRightCollision();
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
