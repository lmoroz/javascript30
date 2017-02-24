const nav = document.querySelector('nav#main');
const navTop = nav.offsetTop;

function fixNav() {
    const {height} = nav.getBoundingClientRect();

    if (navTop <= window.scrollY) {
        document.body.classList.add('fixed-nav');
        document.body.style.paddingTop = `${height}px`;
    } else {
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = 0;
    }
}

window.addEventListener('scroll', fixNav);
