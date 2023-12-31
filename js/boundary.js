//
// Boundary Class
//

import { c } from './htmlGame.js';
import { map, getMap } from './map.js';
import { Pellet } from './pellet.js';
import { PowerUp } from './powerUp.js';

getMap(1);

export class Boundary {
    static width = 40;
    static height = 40;
    constructor({ position, image }) {
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
    };

    draw() {
        c.drawImage(this.image, centerMap.centerPosX + this.position.x - centerMap.halfWidth, centerMap.centerPosY + this.position.y - centerMap.halfHeight);
    };
}

//
// Center Map
//

// get position of canvas
const canvasRect = c.canvas.getBoundingClientRect();
const canvasX = canvasRect.left;
const canvasY = canvasRect.top;

// calculate position of boundary (center)
const posX = canvasX + c.canvas.width / 2;
const posY = canvasY + c.canvas.height / 2;

let mapHalfWidth = 0;
let mapHalfHeight = 0;

export let centerMap = {
    centerPosX: posX,
    centerPosY: posY,
    halfHeight: 0,
    halfWidth: 0
};

export function updateMapCenter() {
    // get half of map width + height
    mapHalfWidth = (map[0].length / 2) * Boundary.height;
    mapHalfHeight = (map.length / 2) * Boundary.width;

    centerMap = {
        centerPosX: centerMap.centerPosX,
        centerPosY: centerMap.centerPosY,
        halfWidth: mapHalfWidth,
        halfHeight: mapHalfHeight
    };
}

updateMapCenter();

//
// Image Source
//

function createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
}

//
// Change Boundary (level)
//

export function getMapLevel(level) {
    switch (level) {
        case 'one':
            changeMap(level)
            break;
        case 'two':
            changeMap(level)
            break;
    }
}

//
// Boundary Draw
//

export let boundaries = [];
export let pellets = [];
export let powerUps = [];

export function createMap() {
    boundaries = [];
    pellets = [];
    powerUps = [];

    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            switch (symbol) {
                case '-':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./assets/map/pipeHorizontal.png')
                        })
                    )
                    break;
                case '|':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./assets/map/pipeVertical.png')
                        })
                    )
                    break;
                case '1':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./assets/map/pipeCorner1.png')
                        })
                    )
                    break;
                case '2':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./assets/map/pipeCorner2.png')
                        })
                    )
                    break;
                case '3':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./assets/map/pipeCorner3.png')
                        })
                    )
                    break;
                case '4':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./assets/map/pipeCorner4.png')
                        })
                    )
                    break;
                case 'b':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./assets/map/block.png')
                        })
                    )
                    break;
                case '[':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            },
                            image: createImage('./assets/map/capLeft.png')
                        })
                    )
                    break;
                case ']':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            },
                            image: createImage('./assets/map/capRight.png')
                        })
                    )
                    break;
                case '_':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            },
                            image: createImage('./assets/map/capBottom.png')
                        })
                    )
                    break;
                case '^':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            },
                            image: createImage('./assets/map/capTop.png')
                        })
                    )
                    break;
                case '+':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            },
                            image: createImage('./assets/map/pipeCross.png')
                        })
                    )
                    break;
                case '5':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            },
                            image: createImage('./assets/map/pipeConnectorTop.png')
                        })
                    )
                    break;
                case '6':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            },
                            image: createImage('./assets/map/pipeConnectorRight.png')
                        })
                    )
                    break;
                case '7':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            },
                            image: createImage('./assets/map/pipeConnectorBottom.png')
                        })
                    )
                    break;
                case '8':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            },
                            image: createImage('./assets/map/pipeConnectorLeft.png')
                        })
                    )
                    break;
                case '.':
                    pellets.push(
                        new Pellet({
                            position: {
                                x: ((j * Boundary.width + Boundary.width / 2) + centerMap.centerPosX) - centerMap.halfWidth,
                                y: ((i * Boundary.height + Boundary.height / 2) + centerMap.centerPosY) - centerMap.halfHeight
                            },
                        })
                    )
                    break;
                case 'p':
                    powerUps.push(
                        new PowerUp({
                            position: {
                                x: ((j * Boundary.width + Boundary.width / 2) + centerMap.centerPosX) - centerMap.halfWidth,
                                y: ((i * Boundary.height + Boundary.height / 2) + centerMap.centerPosY) - centerMap.halfHeight
                            },
                        })
                    )
                    break;
            }
        })
    })
}

createMap();
