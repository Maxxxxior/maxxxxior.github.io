// Initialization
const themeBtn = document.getElementById('themeBtn');
const initialTheme = localStorage.getItem('theme') || 'dark';
setTheme(initialTheme);

// Theme 
themeBtn.addEventListener('click', () => {
    const next = (html.dataset.theme === 'dark') ? 'light' : 'dark';
    setTheme(next);
});

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}