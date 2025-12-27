/**
 * Theme Management
 */

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupThemeToggleListener();
});

/**
 * Initialize theme from localStorage
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
}

/**
 * Apply theme to body
 */
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
    updateThemeToggleIcon(theme);
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const toggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add rotation animation
    if (toggle) {
        toggle.style.animation = 'none';
        toggle.style.transform = 'rotate(0deg) scale(0.8)';
        
        setTimeout(() => {
            toggle.style.animation = '';
            toggle.style.transform = 'rotate(360deg) scale(1)';
        }, 50);
        
        setTimeout(() => {
            toggle.style.transform = '';
        }, 500);
    }
    
    applyTheme(newTheme);
    
    // Show notification
    if (typeof showMessage === 'function') {
        showMessage(`Switched to ${newTheme} mode`, 'success');
    }
}

/**
 * Setup theme toggle button listener
 */
function setupThemeToggleListener() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }
}

/**
 * Update theme toggle icon
 */
function updateThemeToggleIcon(theme) {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        // Add fade transition
        toggle.style.opacity = '0';
        toggle.style.transform = 'scale(0.8) rotate(90deg)';
        
        setTimeout(() => {
            toggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            toggle.style.opacity = '1';
            toggle.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    }
}

/**
 * Get current theme
 */
function getCurrentTheme() {
    return localStorage.getItem('theme') || 'dark';
}
