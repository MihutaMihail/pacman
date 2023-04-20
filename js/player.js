//
// Player Class
//

import { c } from './html.js';
import { centerMap } from './boundary.js';

class Player {
    constructor({position, velocity}) {
        this.position = position;
        this.startPosition = Object.assign({}, position);
        this.velocity = velocity;
        this.radius = 15;
        this.radians = 0.75;
        this.openRate = 0.04;
        this.rotation = 0;
    };

    draw() {
        c.save();
        c.translate(this.position.x, this.position.y);
        c.rotate(this.rotation);
        c.translate(-this.position.x, -this.position.y);
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0 + this.radians, Math.PI * 2 - this.radians);
        c.lineTo(this.position.x, this.position.y);
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
        c.restore();
    };

    update(reset) {
        if (reset) {
            this.position.x = this.startPosition.x;
            this.position.y = this.startPosition.y;
        }

        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.radians < 0 || this.radians > 0.75 ) this.openRate = -this.openRate 
        
        this.radians += this.openRate;
    }
}

//
// Player Variable
//

import { Boundary } from './boundary.js';

export const player = new Player({
    position : {
        x: ((Boundary.width * 6 + Boundary.width / 2) + centerMap.centerPosX) - centerMap.halfWidth,
        y: (( Boundary.height * 5 + Boundary.height / 2) + centerMap.centerPosY) - centerMap.halfHeight
    },
    velocity: {
        x: 0,
        y: 0
    }
})

player.draw();