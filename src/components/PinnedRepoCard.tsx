import type { Repository } from '../data/repositories';
import type { TranslationKey } from '../locales/i18nData';

interface PinnedRepoCardProps {
    repo: Repository;
    liveLanguage?: string;
    t: (key: TranslationKey) => string;
}

export function PinnedRepoCard({ repo, liveLanguage, t }: PinnedRepoCardProps) {
    const displayLang = liveLanguage === "N/A" ? "N/A" : (liveLanguage || repo.langName);
    const displayClass = liveLanguage === "N/A" ? "unknown" : (liveLanguage?.toLowerCase() || repo.langClass);
    const isUnknown = liveLanguage === "N/A";

    return (
        <div className="pinnedRepo">
            <div className="repoHeader">
                <span className="material-symbols-outlined">book_2</span>
                <a href={repo.url} className="repoName">{repo.name}</a>
            </div>
            
            <span className="repoDescription">{t(repo.description)}</span>

            <div className="repoFooter">
                <span className={`material-symbols-outlined proLang ${isUnknown ? 'unknown' : displayClass}`} title={isUnknown ? t('noLanguageTooltip'): undefined}>circle</span>
                <span className="repoLang" title={isUnknown ? t('noLanguageTooltip'): undefined}>{displayLang}</span>
            </div>
            
            {repo.inDevelopment && (
                <div className="badge">
                    <span className="material-symbols-outlined project-card-symbol warning">warning</span>
                    <span data-i18n-tooltip="inDevelopmentTooltip">{t('projectStatusInDevelopment')}</span>
                </div>
            )}
        </div>
    );
}