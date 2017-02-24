const container = document.querySelector('.items');
let mousedown = false;
let startX;
let scrollLeft;

function scrollMe(event) {
    event.preventDefault();
    const x = event.pageX - container.offsetLeft;
    const walk = (x - startX) * 3;
    container.scrollLeft = scrollLeft - walk;
}

container.addEventListener('mousedown', (e) => {
    mousedown = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
});
container.addEventListener('mouseup', () => {
    mousedown = false;
    container.classList.remove('active');
});
container.addEventListener('mouseleave', () => {
    mousedown = false;
    container.classList.remove('active');
});
container.addEventListener('mousemove', (e) => mousedown && scrollMe(e));
