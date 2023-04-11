//
// Animate
//

import { boundaries, pellets }              from '../boundary.js';
import { keys, lastKey }                    from '../keyboardInput.js';
import { player }                           from '../player.js';
import { canvas, c, scoreEl }               from '../html.js';
import { arrowUpCollision, arrowRightCollision, arrowDownCollision, arrowLeftCollision, circleCollidesWithRectangle } from './collisionTools.js';

let score = 0;

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

    // draw pellets + check collision
    for (let i = pellets.length - 1; 0 < i; i--) {
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

    // draw boudaries + check collision
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
