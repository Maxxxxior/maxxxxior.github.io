import type { TranslationKey } from '../locales/i18nData';
import { PixelArtGallery } from '../components/PixelArtGallery';

interface AboutMeProps {
    t: (key: TranslationKey) => string
}

export function AboutMe({ t }: AboutMeProps) {
    return (
        <main>
            <PixelArtGallery t={t} />
        </main>
    )
}