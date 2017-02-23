'use strict';

const player = document.querySelector('video');
const player_container = document.querySelector('div.player');
const skip_buttons = document.querySelectorAll('button.player__button');
const player_toggle_button = document.querySelector('button.player__button.toggle');
const ranges_input = document.querySelectorAll('input.player__slider');
const progress_bar = document.querySelector('div.progress__filled');
const progress_bar_container = document.querySelector('div.progress');

const ranges_popup = document.createElement('div');
ranges_popup.classList.add('ranges_popup');
player_container.appendChild(ranges_popup);

function show_progress() {
    const currentProgress = (player.currentTime * 100) / player.duration;
    progress_bar.style.flexBasis = `${currentProgress}%`;
}

function set_skip(event) {
    const totalTime = player.duration;
    const curSkip = parseInt(event.target.dataset.skip);
    let newTime = (player.currentTime + curSkip);
    if (newTime < 0)
        newTime = 0;
    else if (newTime > totalTime)
        newTime = totalTime;

    player.currentTime = newTime;
}

function set_progress(event) {
    if (event.buttons !== 1)
        return;

    const currentProgress = (event.offsetX / progress_bar_container.offsetWidth) * player.duration;
    player.currentTime = currentProgress;
}

function toggle_range(event) {
    ranges_popup.classList.add('active');

    let rangeValue = event.target.value;
    player[event.target.name] = rangeValue;
    if (event.target.name === 'volume')
        rangeValue = Math.ceil(rangeValue * 100);
    const title = `${event.target.dataset.title}: ${rangeValue}${event.target.dataset.postfix}`;
    event.target.setAttribute('title', title);
    ranges_popup.textContent = title;
}

function toggle_play(event) {
    if (event.type === 'keyup' && event.keyCode !== 32)
        return;

    if (player.paused) {
        player_container.classList.remove('pause');
        player.play();
    } else {
        player_container.classList.add('pause');
        player.pause();
    }

    player_toggle_button.blur(); // to focus on body for space key press catch
}

function toggle_button() {
    player_toggle_button.textContent = player.paused
        ? '►'
        : '❚❚';
}

progress_bar_container.addEventListener('mousedown', set_progress);
progress_bar_container.addEventListener('mousemove', set_progress);
progress_bar_container.addEventListener('click', set_progress);

skip_buttons.forEach((player_button) => player_button.addEventListener('click', set_skip));

player.addEventListener('timeupdate', show_progress);

player.addEventListener('play', toggle_button);
player.addEventListener('pause', toggle_button);

player_toggle_button.addEventListener('click', toggle_play);
player.addEventListener('click', toggle_play);
document.body.addEventListener('keyup', toggle_play);

ranges_input.forEach(input => input.addEventListener('change', toggle_range));
ranges_input.forEach(input => input.addEventListener('mousemove', toggle_range));

ranges_input.forEach(input => input.addEventListener('mouseout', () => {
    window.setTimeout(() => {
        ranges_popup.classList.remove('active');
    }, 1500);
}));
