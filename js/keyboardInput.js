//
// Keyboard Input
//

let lastKey = '';

export { lastKey };

const keys = {
    z: {
        pressed : false
    },
    q: {
        pressed : false
    },
    s: {
        pressed : false
    },
    d: {
        pressed : false
    }
}

export { keys };

addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'z':
            keys.z.pressed = true;
            lastKey = 'z';
            break;
        case 'q':
            keys.q.pressed = true;
            lastKey = 'q';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'z':
            keys.z.pressed = false;
            break;
        case 'q':
            keys.q.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
})
