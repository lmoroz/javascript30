const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

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

function paintToCanvas() {
    const {videoWidth: width, videoHeight: height} = video;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // const pixels = ctx.getImageData(0, 0, width, height);
    }, 16);
}

function takePhoto() {
    // sound play:
    snap.currentTime = 0;
    snap.play();

    // take the data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    strip.innerHTML = `<a href="${data}" download="handsome"><img src="${data}" height=75 /></a>${strip.innerHTML}`;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
document.body.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) {
        takePhoto();
    }
});
