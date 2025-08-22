// Initialization
const html = document.documentElement;

const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();

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