'use strict';
var dcs = document.querySelector;
var dcsa = document.querySelectorAll;
const player_element = document.querySelector('video');
const player_buttons = document.querySelectorAll('button.player__button');
const player_toggle_button = document.querySelector('button.player__button.toggle');
const ratio_input = document.querySelector('input[name="playbackRate"]');
const volume_input = document.querySelector('input[name="volume"]');
const progress_bar = document.querySelector('div.progress__filled');
const progress_bar_container = document.querySelector('div.progress');

function show_progress(event) {
    const currentTime = player_element.currentTime;
    const totalTime = player_element.duration;
    const currentProgress = currentTime * 100 / totalTime;
    progress_bar.style.width = `${currentProgress}%`;
    progress_bar.style.flexBasis = `${currentProgress}%`;
}

function set_progress(event) {
    if ((event.type != "click" && event.buttons != 1))
        return;

    const totalTime = player_element.duration;
    if (event.target.dataset.skip !== undefined) {
        const playerTime = player_element.currentTime;
        const curSkip = parseInt(event.target.dataset.skip);
        let newTime = (playerTime + curSkip);
        if (newTime < 0)
            newTime = 0;
        else if (newTime > totalTime)
            newTime = totalTime;
        const newProgress = newTime * 100 / totalTime;

        player_element.currentTime = newTime;
        progress_bar.style.width = `${newProgress}%`;
        progress_bar.style.flexBasis = `${newProgress}%`;
        return;
    }
    if (event.target != progress_bar && event.target != progress_bar_container)
        return;

    const fullLenght = progress_bar_container.offsetWidth;
    const curPosition = event.offsetX;

    const currentProgress = curPosition * 100 / fullLenght;
    progress_bar.style.width = `${currentProgress}%`;
    progress_bar.style.flexBasis = `${currentProgress}%`;

    const setProgress = totalTime / 100 * currentProgress;

    player_element.currentTime = setProgress;
}

function toggle_ratio(event) {
    if ((event.type != "change" && event.buttons != 1))
        return;
    player_element.playbackRate = event.target.value;
    ratio_input.setAttribute('title', `ratio: ${event.target.value}`)
}

function toggle_volume(event) {
    if ((event.type != "change" && event.buttons != 1))
        return;
    player_element.volume = event.target.value;
    volume_input.setAttribute('title', `volume: ${event.target.value * 100}%`)
}

function toggle_play(event) {
    if ((event.type == "keyup" && event.keyCode != 32))
        return;

    (!player_toggle_button.classList.contains("active"))
        ? player_element.play()
        : player_element.pause();
}

progress_bar_container.addEventListener('mousedown', set_progress);
progress_bar_container.addEventListener('mousemove', set_progress);
progress_bar_container.addEventListener('click', set_progress);

player_element.addEventListener('timeupdate', show_progress);

player_element.addEventListener('play', (event) => {
    player_toggle_button.textContent = "❚❚";
    player_toggle_button.classList.add("active");
});
player_element.addEventListener('pause', (event) => {
    player_toggle_button.textContent = "►";
    player_toggle_button.classList.remove("active");
});

player_toggle_button.addEventListener('click', toggle_play);
document.body.addEventListener('keyup', toggle_play);

ratio_input.addEventListener('change', toggle_ratio);
ratio_input.addEventListener('mousemove', toggle_ratio);
volume_input.addEventListener('change', toggle_volume);
volume_input.addEventListener('mousemove', toggle_volume);

player_buttons.forEach((player_button) => player_button.addEventListener('click', set_progress));
