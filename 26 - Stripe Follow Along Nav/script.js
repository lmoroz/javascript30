const navLinks = document.querySelectorAll('nav ul.cool>li');
const navPopup = document.querySelector('div.dropdownBackground');

function showDropdown() {
    this.classList.add('trigger-enter');
    navPopup.classList.add('open');
    const {width, height, top, left} = this.querySelector('.dropdown').getBoundingClientRect();
    const navOffset = (document.querySelector('nav ul.cool').getBoundingClientRect()).top;

    navPopup.style.setProperty('width', `${width}px`);
    navPopup.style.setProperty('height', `${height}px`);
    navPopup.style.setProperty('transform', `translate(${left}px, ${top - navOffset}px)`);

    window.setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 200);
}
function hideDropdown() {
    this.classList.remove('trigger-enter-active', 'trigger-enter');
    navPopup.classList.remove('open');
}

navLinks.forEach(navLink => navLink.addEventListener('mouseenter', showDropdown));
navLinks.forEach(navLink => navLink.addEventListener('mouseleave', hideDropdown));
