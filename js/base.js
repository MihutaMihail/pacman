//
// Canvas element + set width/height
//

export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
