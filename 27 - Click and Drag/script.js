const container = document.querySelector('.items');
let mousedown = false;

function scrollMe(event) {
    // event.stopPropagation(); // stop bubbling
    console.log({
        element: event.target.classList.value,
        clientX: event.clientX,
        layerX: event.layerX,
        offsetX: event.offsetX,
        movementX: event.movementX,
        x: event.x
    });
    container.scrollLeft -= event.movementX;
}

container.addEventListener('mousedown', () => {
    mousedown = true;
    container.classList.add('active');
});
container.addEventListener('mouseup', () => {
    mousedown = false;
    container.classList.remove('active');
});
container.addEventListener('mousemove', (e) => mousedown && scrollMe(e));
