//
// Canvas Element
//

export const canvas = document.querySelector('#canvasGame');
export const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

//
// Score element
//

export let scoreEl = document.querySelector('#score');

//
// Health element
//

export let healthEl = document.querySelector('#health');

//
// Sound elements
//

export let musicBeginningEl = document.querySelector('#musicBeginning');
export let soundChompEl = document.querySelector('#soundChomp');
export let soundDeathEl = document.querySelector('#soundDeath');
export let soundEatFruitEl = document.querySelector('#soundEatFruit');
export let soundEatGhostEl = document.querySelector('#soundEatGhost');
export let soundIntermissionEl = document.querySelector('#soundIntermission');


 