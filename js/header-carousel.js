// js/header-carousel.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Header Elements ---
    const header = document.getElementById('main-header'); // You can keep this if 'header' is used elsewhere, otherwise remove.
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.main-nav .menu-list');

    // --- Carousel Elements ---
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let slideInterval;

    // --- Carousel Functionality ---
    function showSlide(index) {
        if (index >= carouselItems.length) {
            index = 0;
        } else if (index < 0) {
            index = carouselItems.length - 1;
        }
        currentIndex = index;

        const slideWidth = carouselItems[0] ? carouselItems[0].clientWidth : window.innerWidth;
        carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        carouselItems.forEach((item, i) => {
            const artistName = item.querySelector('.artist-name');
            if (artistName) {
                if (i === currentIndex) {
                    artistName.style.opacity = '1';
                } else {
                    artistName.style.opacity = '0';
                }
            }
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function startSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 5000);
    }

    showSlide(0);
    startSlideShow();

    window.addEventListener('resize', () => {
        showSlide(currentIndex);
        startSlideShow();
    });


    // --- Hamburger Menu Toggle Functionality ---
    menuToggle.addEventListener('click', () => {
        menuList.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuList.classList.contains('open')) {
                menuList.classList.remove('open');
                menuToggle.classList.remove('open');
            }
        });
    });
});
