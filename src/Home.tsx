import type { TranslationKey } from './locales/i18nData';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Repositories } from './components/Repositories';
import { SAM } from './components/SAM';

interface HomeProps {
    t: (key: TranslationKey) => string;
    githubLanguages: { [repoName: string]: string };
}

export function Home({ t, githubLanguages }: HomeProps) {
    return (
        <main>
            <FeaturedProjects t={t} />

            <Repositories t={t} githubLanguages={githubLanguages} />

            <SAM t={t} />
        </main>
    )
}