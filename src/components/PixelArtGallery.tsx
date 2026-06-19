import type { TranslationKey } from '../locales/i18nData';
import { GALLERY_DATA } from '../data/galleryData';
import { PixelartModal } from './PixelartModal';

interface PixelArtGalleryProps {
    t: (key: TranslationKey) => string;
}

export function PixelArtGallery({ t }: PixelArtGalleryProps) {
    const handleOpenModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (typeof window.openModal === 'function') {
            window.openModal(e.currentTarget);
        }
    };

    return (
        <>
            <section className="pixelGallery">
                <h2>{t('myPixelArt')}</h2>

                <div className="galleryGrid">
                    {GALLERY_DATA.map((group, groupIndex) => (
                        <div key={groupIndex} className="spriteCard" onClick={handleOpenModal}>
                            <div className="spriteDisplay">
                                {group.sprites.map((sprite, spriteIndex) => (
                                    <img key={spriteIndex} src={sprite.src} alt={sprite.alt} className={`sprite ${sprite.type}`} data-i18n-desc={sprite.descKey} />
                                ))}
                            </div>
                            <p className="spriteTitle">{t(group.titleKey)}</p>
                        </div>
                    ))}
                </div>
            </section>

            <PixelartModal t={t} />
        </>
    )
}