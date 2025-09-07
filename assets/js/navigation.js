// Navigation Component
document.addEventListener('DOMContentLoaded', function() {
    // Add navigation styles
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'assets/css/navigation.css';
    document.head.appendChild(styleLink);

    // Navigation HTML - matching portfolio.html style
    const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">Mercedis.fo</a>
            <div class="nav-menu">
                <a href="index.html" class="nav-link">Heim</a>
                <a href="framsyningar.html" class="nav-link">Framsýningar</a>
                <a href="portfolio.html" class="nav-link">Listaverk</a>
                <a href="um_meg.html" class="nav-link">Um meg</a>
                <a href="samband.html" class="nav-link">Samband</a>
            </div>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>`;

    // Add navigation to the top of the body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Navigation functionality
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Toggle mobile menu
    hamburger.addEventListener("click", mobileMenu);

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(n => n.addEventListener("click", closeMenu));

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target) || event.target.closest('.logo');
        if (!isClickInside && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }

    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        // Remove any existing active classes first
        link.classList.remove('active');
        
        // Check if this link's href matches the current page
        const linkHref = link.getAttribute('href');
        
        // Special case for index.html (home page)
        if (currentPage === 'index.html' && linkHref === 'index.html') {
            link.classList.add('active');
            return;
        }
        
        // For other pages, check if the link's href matches the current page
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});
