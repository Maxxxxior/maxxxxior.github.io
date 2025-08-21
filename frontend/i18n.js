// I18N
const I18N = {
    pl: {
        repos: 'Repozytoria',
        changeTheme: 'Zmień motyw',
        myProjects: 'Moje projekty',
        myRepos: 'Moje repozytoria',
        repoBase64: 'base64Encoder i Decoder.',
        repoDiscordBotGB: 'Bot Discord, którego zrobiłem i oznaczyłem jako GB. W przyszłości może dodam jakieś instrukcje do pliku README.',
        repoFunkyChat: 'Czat stworzony na projekt szkolny.',
        repoImageToText: 'Program napisany w Pythonie do konwertowania tekstu z obrazu na tekst.',
        repoMaxxxxiorGithubIO: 'Moje osobiste portfolio: wszystkie projekty, które stworzyłem i które stworzę.',
        internProject: 'Projekt na praktyki',
        websiteWChUW: 'Projekt poboczny ;) (w trakcie realizacji)',
        // websiteWChUW: 'Strona dla Wydziału Chemii Uniwersytetu Warszawskiego (WChUW)',
        createdBy: 'Stworzone przez'
    },
    en: {
        repos: 'Repositories',
        changeTheme: 'Change theme',
        myProjects: 'My projects',
        myRepos: 'My github repositories',
        repoBase64: 'base64Encoder and Decoder.',
        repoDiscordBotGB: 'Discord bot I made marked as GB. In future maybe i\'ll add some instructions to readme file.',
        repoFunkyChat: 'Chat made for school project.',
        repoImageToText: 'Software made in python for converting text found on image to text.',
        repoMaxxxxiorGithubIO: 'My personal portfolio: all the projects I\'ve created and will create.',
        internProject: 'Project for my internship',
        websiteWChUW: 'Side Project ;) (in development)',
        // websiteWChUW: 'Website for the Faculty of Chemistry, University of Warsaw (WChUW)',
        createdBy: 'Created by'
    }
}

// Initialization
const langBtn = document.getElementById('langBtn');
const initialLang = localStorage.getItem('lang') || 'pl';
setLang(initialLang);

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