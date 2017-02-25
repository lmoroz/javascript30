'use strict';

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timer = document.querySelector('.timer');
let gameInterval = null;
let gameStopTime = Date.now() + 10000; // now + 10 sec
let lastHole;

function randTime(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
function catchMole(e) {
    if (!e.isTrusted) 
        return;
    scoreBoard.textContent = parseInt(scoreBoard.textContent) + 1;
}
function randomHole() {
    const curMole = holes[randTime(0, holes.length - 1)];
    if (lastHole === curMole)
        return randomHole();
    lastHole = curMole;
    return curMole;
}

function processGame() {
    if (Date.now() > gameStopTime)
        return;
    const curMole = randomHole();
    curMole.classList.add('up');
    setTimeout(() => {
        curMole.classList.remove('up');
        setTimeout(() => {
            curMole.addEventListener('click', catchMole, {once: true});
            processGame();
        }, randTime(250, 1000));
    }, randTime(200, 1000));
}

function processTimer() {
    const leastSeconds = Math.round((gameStopTime - Date.now()) / 1000);
    if (leastSeconds <= 0)
        clearInterval(gameInterval);
    timer.textContent = leastSeconds < 10
        ? `0${leastSeconds}`
        : leastSeconds;
}

function startGame() {
    gameStopTime = Date.now() + 10000; // now + 10 sec
    scoreBoard.textContent = 0;
    gameInterval = setInterval(processTimer, 100);
    processGame();
}

moles.forEach(mole => mole.addEventListener('click', catchMole, {once: true}));
