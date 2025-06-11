document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const desktopMenuIcon = document.querySelector('.desktop-nav .menu-icon');
    const desktopMenuList = document.querySelector('.desktop-nav .menu-list');
    const mobileMenuToggle = document.querySelector('.mobile-nav .mobile-menu-toggle');
    const mobileMenuToggleBars = document.querySelectorAll('.mobile-nav .mobile-menu-toggle .bar');
    const mobileNav = document.querySelector('.mobile-nav'); // To fade in background

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Desktop menu toggle
    if (desktopMenuIcon) {
        desktopMenuIcon.addEventListener('click', () => {
            desktopMenuList.classList.toggle('open');
            // Optional: Animate menu icon to 'X' (you'll need more CSS for this)
        });
    }

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('open');
            // This is where you fade in the header background when menu is pressed
            // and user is at the top of the page.
            if (mobileMenuToggle.classList.contains('open')) {
                header.style.backgroundColor = '#292929'; // Immediately set background
                header.style.transition = 'background-color 0.3s ease-in-out'; // Apply transition
            } else {
                // If the user is at the top, revert to transparent
                if (window.scrollY <= 50) { // Check scroll position again
                    header.style.backgroundColor = 'transparent';
                }
            }
        });
    }

    // Vertical Carousel Logic (More complex, but here's a basic idea)
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const numberOfItems = carouselItems.length;

    if (carouselInner && numberOfItems > 0) {
        // To make the animation smooth and continuous, you might need to duplicate
        // the items in the carousel-inner. For now, the CSS animation handles a basic loop.
        // For a more robust solution, you'd use JS to dynamically reorder/clone items.

        // Adjust the keyframe animation in CSS based on the number of items.
        // The `translateY(-100%)` assumes each item is 100vh.
        // If you have `N` items, the full scroll would be `N * 100%`.
        // The animation `scroll-vertical` should be adjusted to `(numberOfItems * X)s`
        // where X is the time per item.
        // For example, if you have 3 items, and want it to scroll continuously,
        // you might set the `to` value of the animation to `translateY(-${100/numberOfItems}%)`
        // and adjust the animation duration accordingly.
        // A more advanced JS carousel would handle this by changing `transform: translateY()`
        // values directly using setInterval or requestAnimationFrame.
    }
});
