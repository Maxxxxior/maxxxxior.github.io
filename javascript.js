// I18N
const I18N = {
    pl: {
        changeTheme: 'Zmień motyw',
        myProjects: 'Moje projekty',
        myRepos: 'Moje repozytoria',
        internProject: 'Projekt na praktyki',
        websiteWChUW: 'Strona dla Wydziału Chemii Uniwersytetu Warszawskiego (WChUW)',
        createdBy: 'Stworzone przez'
    },
    en: {
        changeTheme: 'Change theme',
        myProjects: 'My projects',
        myRepos: 'My github repositories',
        internProject: 'Project for my internship',
        websiteWChUW: 'Website for the Faculty of Chemistry, University of Warsaw (WChUW)',
        createdBy: 'Created by'
    }
}

// Initialization
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const langBtn = document.getElementById('langBtn');

const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();

const initialTheme = localStorage.getItem('theme') || 'dark';
setTheme(initialTheme);

const initialLang = localStorage.getItem('lang') || 'pl';
setLang(initialLang);

// Theme
themeBtn.addEventListener('click', () => {
    const next = (html.dataset.theme === 'dark') ? 'light' : 'dark';
    setTheme(next);
});

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Language
langBtn.addEventListener('click', () => {
    const next = (localStorage.getItem('lang') || 'pl') === 'pl' ? 'en' : 'pl';
    setLang(next);
});

function setLang(lang) {
    localStorage.setItem('lang', lang);
    langBtn.textContent = lang === 'pl' ? 'EN' : 'PL';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = I18N[lang][key];
    });
}

// Sort repos alphabetical order
function sortRepos() {
    const container = document.querySelector(".repos");
    const allRepos = Array.from(container.querySelectorAll("a.repo"));

    const normalRepos = allRepos.filter(a => a.hasAttribute("href"));
    const specialRepos = allRepos.filter(a => !a.hasAttribute("href"));

    normalRepos.sort((a, b) => a.textContent.toLowerCase().localeCompare(b.textContent.toLowerCase()));

    normalRepos.forEach(a => container.appendChild(a));
    specialRepos.forEach(a => container.appendChild(a));
}