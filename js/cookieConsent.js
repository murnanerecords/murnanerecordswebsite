// js/cookieConsent.js

document.addEventListener('DOMContentLoaded', () => {
    const cookieConsentPopup = document.getElementById('cookieConsent');
    const initialCookieView = document.getElementById('initialCookieView');
    const detailedCookieView = document.getElementById('detailedCookieView');
    const footerCookieChoicesLink = document.getElementById('showCookieChoices'); // The "Cookie Choices" link in the footer

    // Initial View Elements
    const acceptButton = document.getElementById('acceptCookies');
    const showDetailedChoicesButton = document.getElementById('showDetailedChoices');

    // Detailed View Elements
    const essentialCookiesCheckbox = document.getElementById('essentialCookies');
    const functionalCookiesCheckbox = document.getElementById('functionalCookies');
    const analyticsCookiesCheckbox = document.getElementById('analyticsCookies');
    const advertisingCookiesCheckbox = document.getElementById('advertisingCookies');
    const confirmCookieChoicesButton = document.getElementById('confirmCookieChoices');
    const showSimplerChoicesLink = document.getElementById('showSimplerChoices');

    // Function to show the popup
    function showCookieConsent() {
        if (cookieConsentPopup) {
            cookieConsentPopup.classList.add('show');
            // Ensure initial view is shown by default when popup appears
            showView(initialCookieView);
        }
    }

    // Function to hide the popup
    function hideCookieConsent() {
        if (cookieConsentPopup) {
            cookieConsentPopup.classList.remove('show');
        }
    }

    // Function to switch between views (Initial vs. Detailed)
    function showView(viewToShow) {
        initialCookieView.classList.remove('active');
        detailedCookieView.classList.remove('active');
        viewToShow.classList.add('active');
        // No need to manipulate cookieConsentPopup.style.height/bottom here.
        // The CSS handles the layout and centering of the popup itself.
    }

    // Function to load cookie preferences from localStorage
    function loadCookiePreferences() {
        // Essential cookies are always true and disabled
        if (essentialCookiesCheckbox) {
            essentialCookiesCheckbox.checked = true;
            essentialCookiesCheckbox.disabled = true;
        }

        // Load other preferences, defaulting to true if no preference is saved
        if (functionalCookiesCheckbox) {
            const functionalConsent = localStorage.getItem('functionalCookies');
            // If functionalConsent is null (not set) OR it's 'true', set checked to true
            functionalCookiesCheckbox.checked = (functionalConsent === null || functionalConsent === 'true');
        }
        if (analyticsCookiesCheckbox) {
            const analyticsConsent = localStorage.getItem('analyticsCookies');
            // If analyticsConsent is null (not set) OR it's 'true', set checked to true
            analyticsCookiesCheckbox.checked = (analyticsConsent === null || analyticsConsent === 'true');
        }
        if (advertisingCookiesCheckbox) {
            const advertisingConsent = localStorage.getItem('advertisingCookies');
            // If advertisingConsent is null (not set) OR it's 'true', set checked to true
            advertisingCookiesCheckbox.checked = (advertisingConsent === null || advertisingConsent === 'true');
        }
    }

    // --- Main Logic for Displaying/Hiding Popup ---
    const consentGiven = localStorage.getItem('cookieConsent');

    if (consentGiven === null) {
        // If no choice has been made, show the popup after a short delay
        setTimeout(showCookieConsent, 500);
    } else {
        // If a choice was made, hide the popup immediately on load
        hideCookieConsent();
    }
    // --- End Main Logic ---

    // Event listener for "I understand" button
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // Set all to accepted by default if user just clicks "I understand"
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('functionalCookies', 'true');
            localStorage.setItem('analyticsCookies', 'true');
            localStorage.setItem('advertisingCookies', 'true');
            hideCookieConsent();
            console.log('Cookies understood and accepted (all categories).');
        });
    }

    // Event listener for "Cookie Choices" button (from initial view)
    if (showDetailedChoicesButton) {
        showDetailedChoicesButton.addEventListener('click', () => {
            showView(detailedCookieView);
            loadCookiePreferences(); // Load preferences when switching to detailed view
            console.log('Showing detailed cookie choices.');
        });
    }

    // Event listener for "Confirm" button (from detailed view)
    if (confirmCookieChoicesButton) {
        confirmCookieChoicesButton.addEventListener('click', () => {
            // Store individual cookie preferences
            localStorage.setItem('cookieConsent', 'custom'); // Indicate custom choice
            localStorage.setItem('functionalCookies', functionalCookiesCheckbox.checked);
            localStorage.setItem('analyticsCookies', analyticsCookiesCheckbox.checked);
            localStorage.setItem('advertisingCookies', advertisingCookiesCheckbox.checked);

            hideCookieConsent();
            console.log('Custom cookie choices confirmed.');
            console.log('Functional:', functionalCookiesCheckbox.checked);
            console.log('Analytics:', analyticsCookiesCheckbox.checked);
            console.log('Advertising:', advertisingCookiesCheckbox.checked);
        });
    }

    // Event listener for "Simpler choices" link (from detailed view)
    if (showSimplerChoicesLink) {
        showSimplerChoicesLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            showView(initialCookieView);
            console.log('Showing simpler cookie choices.');
        });
    }

    // Event listener for "Cookie Choices" link in the footer
    if (footerCookieChoicesLink) {
        footerCookieChoicesLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            showCookieConsent(); // First, ensure the popup is visible
            showView(detailedCookieView); // Then, switch to the detailed view
            loadCookiePreferences(); // Load preferences when opening from the footer
            console.log('Opening detailed cookie choices from footer.');
        });
    }

    // Prevent any interaction with the disabled Essential checkbox and its parent
    if (essentialCookiesCheckbox) {
        essentialCookiesCheckbox.parentElement.addEventListener('click', (event) => {
            if (essentialCookiesCheckbox.disabled) {
                event.preventDefault();
                event.stopPropagation();
            }
        });
    }

    // Initial load of preferences (useful if the popup isn't shown immediately but is opened later)
    loadCookiePreferences();
});
