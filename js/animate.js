//
// Animate
//

import { boundaries }   from './boundary.js';

import { keys }         from './keyboardInput.js';
import { lastKey }      from './keyboardInput.js';

import { player }       from './player.js';

import { canvas }       from './base.js';
import { c }            from './base.js';

function animate() {
    // create loop
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    boundaries.forEach((boundary) => {
        boundary.draw();
    })

    if (keys.z.pressed && lastKey === 'z') {
        player.velocity.x = 0;
        player.velocity.y = -5;
    } else if (keys.q.pressed && lastKey === 'q') {
        player.velocity.y = 0;
        player.velocity.x = -5;
    } else if (keys.s.pressed && lastKey === 's') {
        player.velocity.x = 0;
        player.velocity.y = 5;
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.y = 0;
        player.velocity.x = 5;
    }

    player.update();
}

animate();
