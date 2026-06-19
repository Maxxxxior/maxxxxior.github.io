import type { TranslationKey } from "../locales/i18nData";

interface FooterProps {
    t: (key: TranslationKey) => string;
}

export function Footer({ t }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <nav className="socials">
                <a href="https://github.com/Maxxxxior" target="_blank" rel="noopener noreferrer" className="fa fa-github" id="socials"></a>
                <a href="https://www.linkedin.com/in/maksymilian-podlecki" target="_blank" rel="noopener noreferrer" className="fa fa-linkedin" id="socials"></a>
            </nav>

            <div className="copyright">
                <span>© <span>{currentYear}</span> <span>{t('createdBy')}</span> <a href="https://github.com/Maxxxxior" target="_blank" rel="noopener noreferrer" className="max">Maxxxxior</a> • <a href="mailto:Maksymilian.Podlecki@gmail.com" className="mail">Maksymilian.Podlecki@gmail.com</a></span>
            </div>
        </footer>
    )
}