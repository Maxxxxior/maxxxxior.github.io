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

// #region Modal image zoom
let currentScale = 1;
let canvas = null;
let ctx = null;
let imageContainer = null;

let imgX = 0, imgY = 0;
let zoom = 1;
let mouseX = 0, mouseY = 0;
let fingerDist = 0;

let currentLoadedImg = null;
let bgCanvasImg = new Image();
let showCanvasBg = true;

bgCanvasImg.src = "assets/sprites/BackgroundCanvas.png";

document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("modalCanvas");
    imageContainer = document.querySelector(".modalImageContainer");

    if (canvas) {
        ctx = canvas.getContext("2d");

        canvas.addEventListener('wheel', handleWheelScroll, { passive: false });
        canvas.addEventListener('mousemove', handleMouseDrag);
        canvas.addEventListener('mousedown', handleMouseDownStart);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
});

window.openModal = function (cardElement) {
    const titleEl = cardElement.querySelector('.spriteTitle');
    const cardTitleKey = titleEl ? titleEl.getAttribute('data-i18n') : null;
    const cardTitle = cardTitleKey ? window.i18n(cardTitleKey) : (titleEl ? titleEl.innerText : "Project");

    document.getElementById("modalTitle").innerText = cardTitle;
    document.getElementById("modalTitle").setAttribute('data-current-title-key', cardTitleKey);

    const images = cardElement.querySelectorAll('.sprite');
    const thumbsContainer = document.getElementById("modalThumbs");
    if (thumbsContainer) {
        thumbsContainer.innerHTML = "";

        images.forEach((img, index) => {
            const thumb = document.createElement("img");
            thumb.src = img.src;
            thumb.classList.add("modalThumb");
            thumb.setAttribute('data-i18n-desc', img.getAttribute('data-i18n-desc'));
            if (index === 0) thumb.classList.add("active");

            thumb.onclick = function () {
                document.querySelectorAll('.modalThumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                window.changeModalImage(img);
                window.updateModalDescription();
            };
            thumbsContainer.appendChild(thumb);
        });
    }

    if (images.length > 0) {
        window.changeModalImage(images[0]);
    }

    window.updateModalDescription();

    document.getElementById("customModal").style.display = "block";
    setTimeout(fitCanvasResolution, 10);
};

window.updateModalDescription = function () {
    const activeThumb = document.querySelector('.modalThumb.active');
    if (activeThumb) {
        const currentDescKey = activeThumb.getAttribute('data-i18n-desc');
        document.getElementById("modalDesc").innerText = window.i18n(currentDescKey);
    }
    
    const titleKey = document.getElementById("modalTitle").getAttribute('data-current-title-key');
    if (titleKey) {
        document.getElementById("modalTitle").innerText = window.i18n(titleKey);
    }
};

window.changeModalImage = function (imgElement) {
    const relativeSrc = imgElement.getAttribute('src');
    const img = new Image();

    img.onload = function () {
        currentLoadedImg = img;

        imgX = img.width / 2;
        imgY = img.height / 2;
        zoom = 1;

        fitCanvasResolution();
        updateDimensions(img);
    };

    img.src = relativeSrc;

    const urlParts = relativeSrc.split('/');
    const fileName = urlParts[urlParts.length - 1];
    document.getElementById("metaFileName").innerText = fileName;

    fetch(relativeSrc, { method: 'HEAD' })
        .then(response => {
            const bytes = response.headers.get('content-length');
            if (bytes) {
                const kb = (bytes / 1024).toFixed(2);
                document.getElementById("metaFileWeight").innerText = kb + " KB";
            } else {
                document.getElementById("metaFileWeight").innerText = "W pamięci podręcznej";
            }
        })
        .catch(() => {
            document.getElementById("metaFileWeight").innerText = "Nieznana";
        });
};

function fitCanvasResolution() {
    if (!imageContainer || !canvas) return;

    const rect = imageContainer.getBoundingClientRect();
    const resolutionBoost = 2;

    canvas.width = rect.width * resolutionBoost;
    canvas.height = rect.height * resolutionBoost;

    window.updateCanvas();
}

function updateDimensions(img) {
    document.getElementById("metaFileSize").innerText = img.naturalWidth + " x " + img.naturalHeight + " px";
}

window.updateCanvas = function () {
    if (!currentLoadedImg || !canvas || !ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    canvasScale = 0.5
    const scaleFit = Math.floor(Math.min(
        w*canvasScale / currentLoadedImg.width,
        h*canvasScale / currentLoadedImg.height
    )) || 1;

    const finalScale = scaleFit * (1 / zoom);

    if (zoom >= 1) {
        zoom = 1;
        imgX = currentLoadedImg.width / 2;
        imgY = currentLoadedImg.height / 2;
    }

    const drawWidth = currentLoadedImg.width * finalScale;
    const drawHeight = currentLoadedImg.height * finalScale;

    const drawX = w / 2 - (imgX * finalScale);
    const drawY = h / 2 - (imgY * finalScale);

    if (showCanvasBg && bgCanvasImg.complete) {
        const bgTargetSize = currentLoadedImg.width * 2;

        const bgWidth = bgTargetSize * finalScale;
        const bgHeight = bgTargetSize * finalScale;
        
        const bgX = w / 2 + ((0 - imgX + currentLoadedImg.width / 2 - bgTargetSize / 2) * finalScale);
        const bgY = h / 2 + ((0 - imgY + currentLoadedImg.height / 2 - bgTargetSize / 2) * finalScale);
        
        ctx.drawImage(bgCanvasImg, bgX, bgY, bgWidth, bgHeight);
    }

    ctx.drawImage(currentLoadedImg, drawX, drawY, drawWidth, drawHeight);
};

function handleWheelScroll(e) {
    e.preventDefault();
    if (!currentLoadedImg) return;

    const rect = canvas.getBoundingClientRect();
    const resBoost = 2;

    const mouseCanvasX = (e.clientX - rect.left) * resBoost;
    const mouseCanvasY = (e.clientY - rect.top) * resBoost;

    const w = canvas.width;
    const h = canvas.height;

    const scaleFit = Math.floor(Math.min(w / currentLoadedImg.width, h / currentLoadedImg.height)) || 1;
    let finalScale = scaleFit * (1 / zoom);

    const drawX = w / 2 - imgX * finalScale;
    const drawY = h / 2 - imgY * finalScale;

    const imgPointX = (mouseCanvasX - drawX) / finalScale;
    const imgPointY = (mouseCanvasY - drawY) / finalScale;

    const zoomFactor = 1.1;
    if (e.deltaY < 0) {
        zoom = zoom / zoomFactor;
    } else {
        zoom = zoom * zoomFactor;
    }

    if (zoom > 1) zoom = 1;
    if (zoom < 0.03) zoom = 0.03;

    finalScale = scaleFit * (1 / zoom);
    imgX = imgPointX + (w / 2 - mouseCanvasX) / finalScale;
    imgY = imgPointY + (h / 2 - mouseCanvasY) / finalScale;

    window.updateCanvas();
}

function handleMouseDrag(e) {
    if (!currentLoadedImg) return;

    if (e.buttons > 0 && zoom < 1) {
        const dragSensitivity = 4;
        const scaleFit = Math.floor(Math.min(canvas.width / currentLoadedImg.width, canvas.height / currentLoadedImg.height)) || 1;
        const finalScale = scaleFit * (1 / zoom);

        imgX += (mouseX - e.clientX) * dragSensitivity / finalScale;
        imgY += (mouseY - e.clientY) * dragSensitivity / finalScale;

        window.updateCanvas();
    }
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function handleMouseDownStart(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function handleTouchStart(e) {
    if (e.touches.length > 1) {
        let diffX = e.touches[0].clientX - e.touches[1].clientX;
        let diffY = e.touches[0].clientY - e.touches[1].clientY;
        fingerDist = Math.sqrt(diffX * diffX + diffY * diffY);
    }
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    if (!currentLoadedImg) return;
    e.preventDefault();

    const scaleFit = Math.floor(Math.min(canvas.width / currentLoadedImg.width, canvas.height / currentLoadedImg.height)) || 1;

    if (e.touches.length > 1) {
        let diffX = e.touches[0].clientX - e.touches[1].clientX;
        let diffY = e.touches[0].clientY - e.touches[1].clientY;
        let newFingerDist = Math.sqrt(diffX * diffX + diffY * diffY);

        zoom = zoom * (fingerDist / newFingerDist);
        fingerDist = newFingerDist;

        if (zoom > 1) zoom = 1;
        if (zoom < 0.03) zoom = 0.03;
    } else {
        if (zoom < 1) {
            const dragSensitivity = 4;
            const finalScale = scaleFit * (1 / zoom);
            imgX += (mouseX - e.touches[0].clientX) * dragSensitivity / finalScale;
            imgY += (mouseY - e.touches[0].clientY) * dragSensitivity / finalScale;

            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }
    window.updateCanvas();
}

window.addEventListener('resize', fitCanvasResolution);

window.modalZoom = function (amount) {
    if (!currentLoadedImg) return;

    zoom = zoom - amount;

    if (zoom > 1) zoom = 1;
    if (zoom < 0.03) zoom = 0.03;

    window.updateCanvas();
};

window.modalResetZoom = function () {
    zoom = 1;
    if (currentLoadedImg) {
        imgX = currentLoadedImg.width / 2;
        imgY = currentLoadedImg.height / 2;
    }
    window.updateCanvas();
};

window.modalToggleBackground = function () {
    showCanvasBg = !showCanvasBg;
    window.updateCanvas();
};

window.modalClose = function () {
    document.getElementById("customModal").style.display = "none";
};

window.onclick = function (event) {
    const modal = document.getElementById("customModal");
    if (event.target == modal) {
        window.modalClose();
    }
};
// #endregion