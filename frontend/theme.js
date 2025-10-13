//#region Initialization
const themeBtn = document.getElementById('themeBtn');
const initialTheme = localStorage.getItem('theme') || 'dark';
setTheme(initialTheme);
//#endregion

//#region Theme 
themeBtn.addEventListener('click', () => {
    const next = (html.dataset.theme === 'dark') ? 'light' : 'dark';
    setTheme(next);
    updateServiceStatus();
});

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}
//#endregion