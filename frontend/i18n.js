//#region I18N
const I18N = {
    pl: {
        repos: 'Repozytoria',
        changeTheme: 'Zmień motyw',
        myProjects: 'Moje projekty',
        maxchatbotProjectTitle: 'MaxChatbot',
        maxchatbotProjectDescription: 'Webowy chatbot stworzony w ramach praktyk. Potrafi analizować dokumenty (CSV, DOCX, PDF) oraz zawartość CMS, aby odpowiadać na pytania na podstawie przesłanych danych.',
        wchuwProjectTitle: 'Spis Pomieszczeń WChUW',
        wchuwProjectDescription: 'Spis pomieszczeń Wydziału Chemii Uniwersytetu Warszawskiego z funkcją logowania oraz wykazem właścicieli i osób uprawnionych do korzystania z poszczególnych pomieszczeń.',
        wchuwProjectDisclaimer: 'Projekt jest w fazie rozwoju - część funkcji może nie być jeszcze dostępna.',
        myRepos: 'Moje repozytoria GitHub',
        repoBase64: 'base64Encoder i Decoder.',
        repoDiscordBotGB: 'Bot Discord, którego zrobiłem i oznaczyłem jako GB. W przyszłości może dodam jakieś instrukcje do pliku README.',
        repoFunkyChat: 'Czat stworzony na projekt szkolny.',
        repoImageToText: 'Program napisany w Pythonie do konwertowania tekstu z obrazu na tekst.',
        repoMaxxxxiorGithubIO: 'Moje osobiste portfolio: wszystkie projekty, które stworzyłem i które stworzę.',
        repoMaxChatbot: 'Webowy chatbot z analizą dokumentów i systemem CMS.',
        repoWChUW: 'Spis pomieszczeń Wydziału Chemii Uniwersytetu Warszawskiego z funkcją logowania oraz wykazem właścicieli i osób uprawnionych do korzystania z poszczególnych pomieszczeń.',
        samTitle: 'Monitor dostępności serwisów',
        projectStatusInDevelopment: 'W fazie rozwoju',
        projectStatusAPI: 'API',
        noLanguageTooltip: 'GitHub nie wykrył języka dla tego repozytorium',
        inDevelopmentTooltip: 'Projekt jest w fazie rozwoju - część funkcji może nie być jeszcze dostępna.',
        // To use tooltip, add this to any element: data-i18n-tooltip="testTooltip"
        testTooltip: 'Testowy tooltip',
        status: 'Sprawdzanie...',
        createdBy: 'Stworzone przez'
    },
    en: {
        repos: 'Repositories',
        changeTheme: 'Change theme',
        myProjects: 'My projects',
        maxchatbotProjectTitle: 'MaxChatbot',
        maxchatbotProjectDescription: 'Web-based chatbot developed during an internship. It can analyze documents (CSV, DOCX, PDF) and CMS content to answer questions based on the uploaded data.',
        wchuwProjectTitle: 'WChUW Room Directory',
        wchuwProjectDescription: 'Directory of rooms at the Faculty of Chemistry, University of Warsaw, featuring login functionality and a list of room owners along with authorized personnel for each room.',
        wchuwProjectDisclaimer: 'The project is currently in development - some features may not yet be available.',
        myRepos: 'My GitHub repositories',
        repoBase64: 'base64Encoder and Decoder.',
        repoDiscordBotGB: 'Discord bot I made marked as GB. In future maybe i\'ll add some instructions to readme file.',
        repoFunkyChat: 'Chat made for school project.',
        repoImageToText: 'Software made in python for converting text found on image to text.',
        repoMaxxxxiorGithubIO: 'My personal portfolio: all the projects I\'ve created and will create.',
        repoMaxChatbot: 'Web Chatbot with document analysis and CMS.',
        repoWChUW: 'Directory of rooms at the Faculty of Chemistry, University of Warsaw, featuring login functionality and a list of room owners along with authorized personnel for each room.',
        samTitle: 'Service Availability Monitor',
        projectStatusInDevelopment: 'In development',
        projectStatusAPI: 'API',
        noLanguageTooltip: 'GitHub did not detect a language for this repository',
        inDevelopmentTooltip: 'The project is currently in development - some features may not yet be available.',
        // To use tooltip, add this to any element: data-i18n-tooltip="testTooltip"
        testTooltip: 'Test tooltip',
        status: 'Checking...',
        createdBy: 'Created by'
    }
}
//#endregion

//#region Initialization
const langBtn = document.getElementById('langBtn');
const initialLang = localStorage.getItem('lang') || 'pl';
setLang(initialLang);
//#endregion

//#region Language
langBtn.addEventListener('click', () => {
    const next = (localStorage.getItem('lang') || 'pl') === 'pl' ? 'en' : 'pl';
    setLang(next);
    updateServiceStatus();
});

function setLang(lang) {
    localStorage.setItem('lang', lang);
    langBtn.textContent = lang === 'pl' ? 'EN' : 'PL';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = I18N[lang][key];
    });

    document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
        const key = el.getAttribute('data-i18n-tooltip');
        el.setAttribute('title', I18N[lang][key]);
    });
}
//#endregion

//#region Global function for translations
window.i18n = function(key) {
    const lang = localStorage.getItem('lang') || 'pl';
    return I18N[lang][key] || key;
};
//#endregion