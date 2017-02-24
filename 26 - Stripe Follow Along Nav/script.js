const navLinks = document.querySelectorAll('nav ul.cool>li');
const navPopup = document.querySelector('div.dropdownBackground');
const navOffset = (document.querySelector('nav ul.cool').getBoundingClientRect()).top;

function showDropdown() {
    this.classList.add('trigger-enter');
    navPopup.classList.add('open');
    const {width, height, top, left} = this.querySelector('.dropdown').getBoundingClientRect();

    navPopup.style.width = `${width}px`;
    navPopup.style.height = `${height}px`;
    navPopup.style.transform = `translate(${left}px, ${top - navOffset}px)`;

    window.setTimeout(() => this.classList.add('trigger-enter-active'), 150);
}
function hideDropdown() {
    this.classList.remove('trigger-enter-active');
    this.classList.remove('trigger-enter');
    navPopup.classList.remove('open');
}

navLinks.forEach(navLink => navLink.addEventListener('mouseenter', showDropdown));
navLinks.forEach(navLink => navLink.addEventListener('mouseleave', hideDropdown));
