//
// Ghost Class
//

import { c } from './html.js';

class Ghost {
    static speed = 1;
    constructor({position, velocity, color}) {
        this.position = position;
        this.startPosition = Object.assign({}, position);
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;
        this.prevCollisions = [];
        this.speed = 1;
        this.scared = false;
    };

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.scared ? 'blue' : this.color;
        c.fill();
        c.closePath();
    };

    update(reset) {
        if (reset) {
            this.position.x = this.startPosition.x;
            this.position.y = this.startPosition.y;
        }

        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}


//
// Ghost Variable
//

import { Boundary } from './boundary.js';

export const ghosts = [
    new Ghost({
        position : {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        color : 'red'
    }),
    new Ghost({
        position : {
            x: Boundary.width * 3 + Boundary.width / 2,
            y: Boundary.height * 5 + Boundary.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        color : 'pink'
    })
]