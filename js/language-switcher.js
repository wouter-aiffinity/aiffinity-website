// Language Switcher
// Automatically redirects based on saved preference or browser language

(function() {
    const currentPath = window.location.pathname;
    const isNL = currentPath.includes('/nl/');
    const savedLang = localStorage.getItem('preferred-language');
    
    // Only run auto-detection on homepage visit (first time or no preference)
    if (!savedLang && currentPath === '/') {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('nl')) {
            window.location.href = '/nl/';
        }
    }
    
    // Handle language toggle clicks
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetLang = this.textContent.trim();
            
            if (targetLang === 'NL' && !isNL) {
                localStorage.setItem('preferred-language', 'nl');
                window.location.href = '/nl/';
            } else if (targetLang === 'EN' && isNL) {
                localStorage.setItem('preferred-language', 'en');
                window.location.href = '/';
            }
        });
    });
    
    // Set active state
    langButtons.forEach(btn => {
        const btnLang = btn.textContent.trim();
        if ((btnLang === 'NL' && isNL) || (btnLang === 'EN' && !isNL)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
})();
