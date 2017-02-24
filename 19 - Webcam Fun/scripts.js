const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const makered = document.querySelector('#makered');
const splitcolors = document.querySelector('#splitcolors');
const doghost = document.querySelector('#doghost');
const greenscreen = document.querySelector('#greenscreen');

function getVideo() {
    const mediaAttrs = {
        video: true,
        audio: false
    };
    navigator.mediaDevices.getUserMedia(mediaAttrs).then(localMediaStream => {
        // console.log(localMediaStream);
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
    }).catch(err => {
        console.log(err);
    });
}

function redEffect(pixels) {
    for (let p = 0; p < pixels.data.length; p += 4) {
        pixels.data[p + 0] = pixels.data[p + 0] + 200; // RED
        pixels.data[p + 1] = pixels.data[p + 1] - 50; // GREEN
        pixels.data[p + 2] = pixels.data[p + 2] * 0.5; // BLUE
    }
    return pixels;
}

function splitColors(pixels) {
    for (let p = 0; p < pixels.data.length; p += 4) {
        pixels.data[p - 150] = pixels.data[p + 0]; // RED
        pixels.data[p + 400] = pixels.data[p + 1]; // GREEN
        pixels.data[p - 400] = pixels.data[p + 2]; // BLUE
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    [...document.querySelectorAll('.rgb input')].forEach((input) => {
        levels[input.name] = input.value;
    });

    for (let p = 0; p < pixels.data.length; p += 4) {
        const red = pixels.data[p + 0];
        const green = pixels.data[p + 1];
        const blue = pixels.data[p + 2];

        if (red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin && red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax) {
            // make it transparent
            pixels.data[p + 3] = 0;
        }
    }
    return pixels;
}

function paintToCanvas() {
    const {videoWidth: width, videoHeight: height} = video;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        if (makered.checked || splitcolors.checked || doghost.checked || greenscreen.checked) {
            // take the pixels out
            let pixels = ctx.getImageData(0, 0, width, height);

            if (makered.checked === true) {
                // change them
                pixels = redEffect(pixels);
            } else if (splitcolors.checked === true) {
                // change them
                pixels = splitColors(pixels);
            } else if (greenscreen.checked === true) {
                // change them
                pixels = greenScreen(pixels);
            }
            if (doghost.checked === true) {
                // change them
                ctx.globalAlpha = 0.1;
            }

            // put them back
            ctx.putImageData(pixels, 0, 0);
        }
    }, 16);
}

function takePhoto() {
    // sound play:
    snap.currentTime = 0;
    snap.play();

    // take the data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    strip.innerHTML = `<a href="${data}" download="handsome" class="photo"><img src="${data}" height=75 /></a>${strip.innerHTML}`;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
document.body.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) {
        takePhoto();
    }
});
