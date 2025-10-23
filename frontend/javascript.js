//#region Initialization
const html = document.documentElement;
const dropBtn = document.querySelector(".dropBtn");
const dropdownContent = document.querySelector(".dropdown-content");
const burgerBtn = document.getElementById("burgerBtn");
const actions = document.querySelector(".actionsWrapper .actions");

const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();
//#endregion

//#region Sort repos alphabetical order
function sortRepos() {
    const container = document.querySelector(".repos");
    const allRepos = Array.from(container.querySelectorAll("a.repo"));

    const normalRepos = allRepos.filter(a => a.hasAttribute("href"));
    const specialRepos = allRepos.filter(a => !a.hasAttribute("href"));

    normalRepos.sort((a, b) => a.textContent.toLowerCase().localeCompare(b.textContent.toLowerCase()));

    normalRepos.forEach(a => container.appendChild(a));
    specialRepos.forEach(a => container.appendChild(a));
}
//#endregion

//#region Burger button for mobile devices support
burgerBtn.addEventListener('click', (e) => {
    actions.classList.toggle('active');
    burgerBtn.textContent = actions.classList.contains('active') ? "✕" : "☰";
});

dropBtn.addEventListener("click", (e) => {
    if (window.innerWidth <= 650) {
        e.preventDefault();
        dropdownContent.classList.toggle("show");
    }
});
//#endregion

//#region My repositories used languages based on highest % straight from Github, using official GitHub API
document.addEventListener("DOMContentLoaded", async () => {
    const CACHE_KEY = "repoLanguages";
    const LAST_FETCH_KEY = "lastApiFetch";
    const DEV_MODE = ["localhost", "127.0.0.1"].includes(location.hostname);
    const CACHE_TIME = DEV_MODE ? 600_000 : 600_000; // 10 min locally, 10 min online
    // const CACHE_TIME = 60 * 1000;

    const getCache = () => {
        try {
            return {
                data: JSON.parse(localStorage.getItem(CACHE_KEY)),
                time: parseInt(localStorage.getItem(LAST_FETCH_KEY)) || 0
            };
        } catch {
            return { data: null, time: 0 };
        }
    };

    const setCache = data => {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(LAST_FETCH_KEY, Date.now());
    };

    const shouldFetch = lastTime => Date.now() - lastTime >= CACHE_TIME;

    const fetchLanguages = async (owner, repoName) => {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`);
        if (!res.ok) throw new Error(`GitHub API error: ${repoName}`);
        return res.json();
    };

    const updateRepos = (languagesCache) => {
        document.querySelectorAll(".pinnedRepo").forEach(repo => {
            const repoLink = repo.querySelector(".repoName");
            const repoLang = repo.querySelector(".repoLang");
            const proLangIcon = repo.querySelector(".proLang");
            if (!repoLink || !repoLang || !proLangIcon) return;

            const match = repoLink.href.match(/github\.com\/([^/]+)\/([^/]+)/);
            if (!match) return;
            const [_, owner, repoName] = match;

            const langData = languagesCache?.[`${owner}/${repoName}`];
            if (!langData) return;

            const entries = Object.entries(langData);
            if (entries.length === 0) {
                repoLang.textContent = "N/A";
                proLangIcon.className = "material-symbols-outlined proLang unknown";

                repoLang.setAttribute("title", i18n("noLanguageTooltip"));
                proLangIcon.setAttribute("title", i18n("noLanguageTooltip"));

                repoLang.setAttribute("data-i18n-tooltip", "noLanguageTooltip");
                proLangIcon.setAttribute("data-i18n-tooltip", "noLanguageTooltip");

                return;
            }

            const [topLang] = entries.sort((a, b) => b[1] - a[1])[0];
            repoLang.textContent = topLang;
            proLangIcon.className = `material-symbols-outlined proLang ${topLang.toLowerCase()}`;
        });
    };

    const { data: cacheData, time: lastFetch } = getCache();
    let languagesData = cacheData;

    if (!languagesData || shouldFetch(lastFetch)) {
        console.log("🔄 Updating data from GitHub...");
        languagesData = {};

        for (const repo of document.querySelectorAll(".pinnedRepo")) {
            const repoLink = repo.querySelector(".repoName");
            if (!repoLink) continue;
            const match = repoLink.href.match(/github\.com\/([^/]+)\/([^/]+)/);
            if (!match) continue;
            const [_, owner, repoName] = match;

            try {
                languagesData[`${owner}/${repoName}`] = await fetchLanguages(owner, repoName);
            } catch (err) {
                console.warn(err);
            }
        }

        setCache(languagesData);
        console.log("✅ Updated data successfully:", new Date().toLocaleTimeString());
    } else {
        console.log("💾 Using cache (last update:", new Date(lastFetch).toLocaleTimeString(), ")");
    }

    updateRepos(languagesData);
});
//#endregion

