'use strict';

const controls = document.querySelectorAll('.timer__controls button');
const inputForm = document.querySelector('form#custom');
const input = document.querySelector('form#custom input');
const displayEnd = document.querySelector('.display__end-time');
const displayLeft = document.querySelector('.display__time-left');
let nextDate = new Date();
let timerInterval = null;

function pad(num) {
    return num.toString().length === 1
        ? `0${num}`
        : num;
}
function showEndTime(leastSeconds) {
    const setSeconds = leastSeconds % 60;
    const setMinutes = Math.floor(leastSeconds / 60) % 60;
    const setHours = Math.floor(leastSeconds / 60 / 60);
    displayLeft.textContent = setHours
        ? `${setHours}:${pad(setMinutes)}:${pad(setSeconds)}`
        : `${pad(setMinutes)}:${pad(setSeconds)}`;
}
function processTimer() {
    if (!timerInterval)
        return;
    const leastSeconds = Math.round((nextDate.getTime() - Date.now()) / 1000);
    if (leastSeconds <= 0)
        clearInterval(timerInterval);

    showEndTime(leastSeconds);
}

function setTimer(event) {
    clearInterval(timerInterval);
    if (event && event.type === 'submit')
        event.preventDefault();
    const leastSeconds = parseInt(this.dataset.time || (this.value * 60));
    nextDate = new Date(Date.now() + (leastSeconds * 1000));

    showEndTime(leastSeconds);

    displayEnd.textContent = `Be Back At ${nextDate.getHours()}:${pad(nextDate.getMinutes())}`;
    timerInterval = setInterval(processTimer, 50);
}

controls.forEach(control => control.addEventListener('click', setTimer));
inputForm.addEventListener('submit', setTimer.bind(input));
input.addEventListener('change', setTimer);
