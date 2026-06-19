import { useState, useEffect } from 'react';
import { useLanguage } from './hooks/useLanguage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AboutMe } from './subpages/AboutMe';
import { Home } from './Home';
import { REPOSITORIES_DATA } from './data/repositories';
import { useGithubLanguages } from './hooks/useGithubLanguages';
import './App.css';

//* Add new subpages here if needed - and update Header.tsx
type Page = 'home' | 'about';

function App() {
    const { lang, toggleLang, t } = useLanguage();
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const githubLanguages = useGithubLanguages(REPOSITORIES_DATA);

    //* Update document title when adding new subpage
    useEffect(() => {
        if (currentPage === 'about') {
            document.title = `${t('aboutMe')} | Maxxxxior`;
        } else {
            document.title = `${t('myProjects')} | Maxxxxior`;
        }
    }, [currentPage, t]);

    const renderMainContent = () => {
        switch (currentPage) {
            case 'about':
                return <AboutMe t={t} />;
            // case 'newsubpage':
            //     return <NewSubPage t={t} />;
            case 'home':
            default:
                return (
                    <Home t={t} githubLanguages={githubLanguages} />
                );
        }
    };

    return (
        <>
            <div className="page">
                <Header lang={lang} toggleLang={toggleLang} t={t} setCurrentPage={setCurrentPage} currentPage={currentPage} />

                {renderMainContent()}

                <Footer t={t} />
            </div>
        </>
    )
}

export default App;