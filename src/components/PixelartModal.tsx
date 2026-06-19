import { useEffect } from "react";
import type { TranslationKey } from "../locales/i18nData";

interface PixelartModalProps {
    t: (key: TranslationKey) => string;
}

declare global {
    interface Window {
        openModal?: (cardElement: HTMLElement) => void;
        changeModalImage?: (imgElement: HTMLImageElement) => void;
        updateModalDescription?: () => void;
        updateCanvas?: () => void;
        modalZoom?: (amount: number) => void;
        modalResetZoom?: () => void;
        modalToggleBackground?: () => void;
        modalClose?: () => void;
    }
}

export function PixelartModal({ t }: PixelartModalProps) {
    useEffect(() => {
        const canvas = document.getElementById("modalCanvas") as HTMLCanvasElement | null;
        const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D | null;
        const imageContainer = document.querySelector(".modalImageContainer") as HTMLDivElement | null;

        let imgX = 0, imgY = 0;
        let zoom = 1;
        let mouseX = 0, mouseY = 0;
        let fingerDist = 0;

        let currentLoadedImg: HTMLImageElement | null = null;
        const bgCanvasImg = new Image();
        let showCanvasBg = true;

        bgCanvasImg.src = "assets/sprites/BackgroundCanvas.png";

        window.openModal = function (cardElement: HTMLElement) {
            const titleEl = cardElement.querySelector('.spriteTitle');
            const cardTitle = titleEl ? (titleEl as HTMLElement).innerText : "Project";

            const modalTitleEl = document.getElementById("modalTitle");
            if (modalTitleEl) modalTitleEl.innerText = cardTitle;

            const images = cardElement.querySelectorAll('.sprite') as NodeListOf<HTMLImageElement>;
            const thumbsContainer = document.getElementById("modalThumbs");

            if (thumbsContainer) {
                thumbsContainer.innerHTML = "";

                images.forEach((img, index) => {
                    const thumb = document.createElement("img");
                    thumb.src = (img as HTMLImageElement).src;
                    thumb.classList.add("modalThumb");

                    const descKey = img.getAttribute('data-i18n-desc');
                    thumb.setAttribute('data-desc-text', descKey ? t(descKey as TranslationKey) : "");

                    if (index === 0) thumb.classList.add("active");

                    thumb.onclick = function () {
                        document.querySelectorAll('.modalThumb').forEach(t => t.classList.remove('active'));
                        thumb.classList.add('active');
                        window.changeModalImage?.(img);
                        window.updateModalDescription?.();
                    };
                    thumbsContainer.appendChild(thumb);
                });
            }

            if (images.length > 0) {
                window.changeModalImage?.(images[0]);
            }

            window.updateModalDescription?.();

            const modal = document.getElementById("customModal");
            if (modal) modal.style.display = "block";
            setTimeout(fitCanvasResolution, 10);
        };

        window.updateModalDescription = function () {
            const activeThumb = document.querySelector('.modalThumb.active');
            if (activeThumb) {
                const fullDesc = activeThumb.getAttribute('data-desc-text') || "";
                const modalDescEl = document.getElementById("modalDesc");
                if (modalDescEl) modalDescEl.innerText = fullDesc;
            }
        };

        window.changeModalImage = function (imgElement: HTMLImageElement) {
            const relativeSrc = imgElement.getAttribute('src') || "";
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
            const metaFileNameEl = document.getElementById("metaFileName");
            if (metaFileNameEl) metaFileNameEl.innerText = fileName;

            fetch(relativeSrc, { method: 'HEAD' })
                .then(response => {
                    const bytes = response.headers.get('content-length');
                    const metaFileWeightEl = document.getElementById("metaFileWeight");
                    if (metaFileWeightEl) {
                        if (bytes) {
                            const kb = (parseInt(bytes) / 1024).toFixed(2);
                            metaFileWeightEl.innerText = kb + " KB";
                        } else {
                            metaFileWeightEl.innerText = "W pamięci podręcznej";
                        }
                    }
                })
                .catch(() => {
                    const metaFileWeightEl = document.getElementById("metaFileWeight");
                    if (metaFileWeightEl) metaFileWeightEl.innerText = "Nieznana";
                });
        };

        function fitCanvasResolution() {
            if (!imageContainer || !canvas) return;
            const rect = imageContainer.getBoundingClientRect();
            const resolutionBoost = 2;

            canvas.width = rect.width * resolutionBoost;
            canvas.height = rect.height * resolutionBoost;

            window.updateCanvas?.();
        }

        function updateDimensions(img: HTMLImageElement) {
            const metaFileSizeEl = document.getElementById("metaFileSize");
            if (metaFileSizeEl) {
                metaFileSizeEl.innerText = img.naturalWidth + " x " + img.naturalHeight + " px";
            }
        }

        window.updateCanvas = function () {
            if (!currentLoadedImg || !canvas || !ctx) return;

            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);
            ctx.imageSmoothingEnabled = false;

            const canvasScale = 0.5;
            const scaleFit = Math.floor(Math.min(
                w * canvasScale / currentLoadedImg.width,
                h * canvasScale / currentLoadedImg.height
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

        function handleWheelScroll(e: WheelEvent) {
            e.preventDefault();
            if (!currentLoadedImg || !canvas) return;

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

            window.updateCanvas?.();
        }

        function handleMouseDrag(e: MouseEvent) {
            if (!currentLoadedImg || !canvas) return;

            if (e.buttons > 0 && zoom < 1) {
                const dragSensitivity = 4;
                const scaleFit = Math.floor(Math.min(canvas.width / currentLoadedImg.width, canvas.height / currentLoadedImg.height)) || 1;
                const finalScale = scaleFit * (1 / zoom);

                imgX += (mouseX - e.clientX) * dragSensitivity / finalScale;
                imgY += (mouseY - e.clientY) * dragSensitivity / finalScale;

                window.updateCanvas?.();
            }
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

        function handleMouseDownStart(e: MouseEvent) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

        function handleTouchStart(e: TouchEvent) {
            if (e.touches.length > 1) {
                const diffX = e.touches[0].clientX - e.touches[1].clientX;
                const diffY = e.touches[0].clientY - e.touches[1].clientY;
                fingerDist = Math.sqrt(diffX * diffX + diffY * diffY);
            }
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }

        function handleTouchMove(e: TouchEvent) {
            if (!currentLoadedImg || !canvas) return;
            e.preventDefault();

            const scaleFit = Math.floor(Math.min(canvas.width / currentLoadedImg.width, canvas.height / currentLoadedImg.height)) || 1;

            if (e.touches.length > 1) {
                const diffX = e.touches[0].clientX - e.touches[1].clientX;
                const diffY = e.touches[0].clientY - e.touches[1].clientY;
                const newFingerDist = Math.sqrt(diffX * diffX + diffY * diffY);

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
            window.updateCanvas?.();
        }

        if (canvas) {
            canvas.addEventListener('wheel', handleWheelScroll, { passive: false });
            canvas.addEventListener('mousemove', handleMouseDrag);
            canvas.addEventListener('mousedown', handleMouseDownStart);
            canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
            canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        }

        window.addEventListener('resize', fitCanvasResolution);

        window.modalZoom = function (amount: number) {
            if (!currentLoadedImg) return;
            zoom = zoom - amount;
            if (zoom > 1) zoom = 1;
            if (zoom < 0.03) zoom = 0.03;
            window.updateCanvas?.();
        };

        window.modalResetZoom = function () {
            zoom = 1;
            if (currentLoadedImg) {
                imgX = currentLoadedImg.width / 2;
                imgY = currentLoadedImg.height / 2;
            }
            window.updateCanvas?.();
        };

        window.modalToggleBackground = function () {
            showCanvasBg = !showCanvasBg;
            window.updateCanvas?.();
        };

        window.modalClose = function () {
            const modal = document.getElementById("customModal");
            if (modal) modal.style.display = "none";
        };

        const handleOutsideClick = (event: MouseEvent) => {
            const modal = document.getElementById("customModal");
            if (event.target === modal) {
                window.modalClose?.();
            }
        };
        window.addEventListener('click', handleOutsideClick);

        return () => {
            canvas?.removeEventListener('wheel', handleWheelScroll);
            canvas?.removeEventListener('mousemove', handleMouseDrag);
            canvas?.removeEventListener('mousedown', handleMouseDownStart);
            canvas?.removeEventListener('touchstart', handleTouchStart);
            canvas?.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', fitCanvasResolution);
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [t]);

    return (
        <div id="customModal" className="modal">
            <span className="closeModal" onClick={() => window.modalClose?.()}>&times;</span>

            <div className="modalContent">
                <div className="modalPreviewSide">
                    <div className="zoomControls">
                        <button onClick={() => window.modalZoom?.(0.2)}>+</button>
                        <button onClick={() => window.modalZoom?.(-0.2)}>-</button>
                        <button onClick={() => window.modalResetZoom?.()}>Reset</button>
                        <button onClick={() => window.modalToggleBackground?.()}>
                            <img src="assets/sprites/BackgroundCanvas.png" style={{ width: '20px', height: '20px' }} alt="bg" />
                        </button>
                    </div>
                    <div className="modalImageContainer">
                        <canvas id="modalCanvas"></canvas>
                    </div>
                    <div id="modalThumbs" className="modalThumbs"></div>
                </div>

                <div className="modalInfoSide">
                    <h2 id="modalTitle">Nazwa projektu</h2>
                    <p id="modalDesc">Opis...</p>

                    <hr style={{ borderColor: '#444', margin: '20px 0' }} />

                    <h3>{t('fileDetails')}</h3>
                    <table className="metaTable">
                        <tbody>
                            <tr>
                                <td>{t('fileName')}</td>
                                <td id="metaFileName">-</td>
                            </tr>
                            <tr>
                                <td>{t('fileSize')}</td>
                                <td id="metaFileSize">-</td>
                            </tr>
                            <tr>
                                <td>{t('fileWeight')}</td>
                                <td id="metaFileWeight">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}