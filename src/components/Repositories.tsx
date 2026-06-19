import type { TranslationKey } from '../locales/i18nData';
import { REPOSITORIES_DATA } from '../data/repositories';
import { PinnedRepoCard } from './PinnedRepoCard';

interface RepositoriesProps {
    t: (key: TranslationKey) => string;
    githubLanguages: { [repoName: string]: string };
}

export function Repositories({ t, githubLanguages }: RepositoriesProps) {
    return (
        <div className="repos">
            <h1 className="myRepos">{t('myRepos')}</h1>
            <div className="pinnedRepos">
                {REPOSITORIES_DATA.map((repo) => {
                    const liveLanguage = githubLanguages[repo.name];
                    return (
                        <PinnedRepoCard key={repo.name} repo={repo} liveLanguage={liveLanguage} t={t} />
                    );
                })}
            </div>
        </div>
    )
}