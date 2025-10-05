// Footer Component
document.addEventListener('DOMContentLoaded', function() {
    // Add footer styles
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'assets/css/footer.css';
    document.head.appendChild(styleLink);

    // Footer HTML
    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Mercedis.fo</h3>
            </div>
            
            <div class="footer-section">
                <h4>Leinkjur</h4>   
                <ul>
                    <li><a href="heim.html">Heim</a></li>
                    <li><a href="portfolio.html">Listaverk</a></li>
                    <li><a href="framsyningar.html">Framsýningar</a></li>
                    <li><a href="um_meg.html">Um meg</a></li>
                    <li><a href="samband.html">Samband</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4>Sosialir miðlar</h4>
                <div class="social-links">
                    <a href="https://www.facebook.com/ellinormer/" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
                    <a href="https://www.instagram.com/ellinormercedis/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                </div>
                <p class="contact-email">ellinor@mercedis.fo</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Ellinor Mercedis</p>
        </div>
    </footer>`;

    // Add footer to the end of the body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
