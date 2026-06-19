import type { TranslationKey } from '../locales/i18nData';

interface FeaturedProjectsProps {
    t: (key: TranslationKey) => string;
}

export function FeaturedProjects({ t }: FeaturedProjectsProps) {
    return (
        <div className="projects">
            <h1 className="myProjects">{t('myProjects')}</h1>

            <div className="projects-grid">
                <a href="https://maxxxxior.github.io/MaxChatbot/index.html" className="project-card">
                    <h2>{t('maxchatbotProjectTitle')}</h2>
                    <p>{t('maxchatbotProjectDescription')}</p>
                </a>

                <a href="https://maxxxxior.github.io/SpisPomieszczenWChUW/" className="project-card">
                    <div className="badge">
                        <span className="material-symbols-outlined project-card-symbol warning">warning</span>
                        <span>{t('projectStatusInDevelopment')}</span>
                    </div>
                    <h2>{t('wchuwProjectTitle')}</h2>
                    <p>{t('wchuwProjectDescription')}</p>
                    <p className="disclaimer">{t('wchuwProjectDisclaimer')}</p>
                </a>
            </div>
        </div>
    )
}