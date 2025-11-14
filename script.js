//Initialization

let currentSlideIndex = 0;
let slides = document.getElementsByClassName('project-slide');
let buttons = document.getElementsByClassName('dot');
let slideInterval = null;


document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks =mobileMenu.querySelectorAll('a');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const mainMenu = document.querySelector('.main-menu');
    const mainMenuLinks = mainMenu.querySelectorAll('a');
    const sections = document.querySelectorAll('section')

    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    mobileMenuLinks.forEach(mobileMenuLink => {
        mobileMenuLink.addEventListener('click', () => {
            hamburgerButton.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if(window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn. addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mainMenuLinks.forEach(mainMenuLink => mainMenuLink.classList.remove('active'));
                const activeLink = document.querySelector(`.main-menu a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => observer.observe(section));

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
    }, 800);
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
    }, 8000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}
