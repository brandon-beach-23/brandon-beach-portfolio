// Hamburger Menu Toggle

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
});
