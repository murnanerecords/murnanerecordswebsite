// js/header-scroll.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!'); // This you are already seeing, great!

    const header = document.getElementById('main-header');
    console.log('Header element found:', header); // NEW: Check if header is null/undefined

    const scrollThreshold = 50; // Distance in pixels from the top to trigger the change
    console.log('Scroll threshold:', scrollThreshold); // NEW: Confirm threshold

    function handleScroll() {
        const currentScrollY = window.scrollY;
        console.log('handleScroll called. currentScrollY:', currentScrollY); // NEW: Check scroll position

        if (currentScrollY > scrollThreshold) {
            console.log('Scrolled past threshold. Adding "scrolled" class.'); // NEW: Log class addition
            header.classList.add('scrolled');
        } else {
            console.log('Above or at threshold. Removing "scrolled" class.'); // NEW: Log class removal
            header.classList.remove('scrolled');
        }
        // NEW: Log the current classes on the header
        console.log('Header classes after update:', header.classList.value);
    }

    // Call handleScroll once on load to check initial position
    handleScroll(); // This will trigger the first logs

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);
});
