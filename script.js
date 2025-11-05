//Initialization

let currentSlideIndex = 0;
let slides = document.getElementsByClassName('project-slide');
let buttons = document.getElementsByClassName('dot');
let slideInterval = null;


document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    //Slide show initialization
    setupButtonClickListeners();
    showSlide(currentSlideIndex);
    startAutoSlide();
});

function showSlide(index) {
    //Make sure slides stay in index range
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }

    const previousSlide = slides[currentSlideIndex];
    const nextSlide = slides[index];

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    previousSlide.classList.remove('active');
    previousSlide.classList.add('exit');

    setTimeout(() => {
        previousSlide.classList.remove('exit');
        nextSlide.classList.add('active');
        buttons[index].classList.add('active');
        currentSlideIndex = index;
    }, 500);
}

function setupButtonClickListeners () {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            stopAutoSlide();
            showSlide(i);
            startAutoSlide();
        });
    }
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        let nextIndex = currentSlideIndex + 1;
        showSlide(nextIndex);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}
