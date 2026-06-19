import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { REPOSITORIES_DATA } from '../data/repositories';
import type { Language, TranslationKey } from '../locales/i18nData';

interface HeaderProps {
    lang: Language;
    toggleLang: () => void;
    t: (key: TranslationKey) => string;

    // Add new subpages here if needed - and update App.tsx
    setCurrentPage: (page: 'home' | 'about') => void;
    currentPage: 'home' | 'about';
}

export function Header({ lang, toggleLang, t, setCurrentPage, currentPage }: HeaderProps) {
    const { toggleTheme } = useTheme();
    const [isBurgerActive, setIsBurgerActive] = useState(false);
    const [isDropdownShow, setIsDropdownShow] = useState(false);
    const topbarRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const handleOutsideAction = (event: MouseEvent | TouchEvent) => {
            if (topbarRef.current && !topbarRef.current.contains(event.target as Node)) {
                setIsBurgerActive(false);
                setIsDropdownShow(false);
            }
        };

        const handleScroll = () => {
            setIsBurgerActive(false);
            setIsDropdownShow(false);
        };

        document.addEventListener('mousedown', handleOutsideAction);
        document.addEventListener('touchstart', handleOutsideAction);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            document.removeEventListener('mousedown', handleOutsideAction);
            document.removeEventListener('touchstart', handleOutsideAction);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navigateTo = (page: 'home' | 'about') => {
        setCurrentPage(page);
        setIsBurgerActive(false);
        setIsDropdownShow(false);
    };

    const handleDropdownClick = (e: React.MouseEvent) => {
        if (window.innerWidth <= 650) {
            e.preventDefault();
            setIsDropdownShow(!isDropdownShow);
        }
    };

    return (
        <header ref={topbarRef} className="topbar" aria-label="Górna belka nawigacyjna">
            {
                // #region Left Side
            }
            <div className="leftSide">
                <div className="github">
                    <a href="https://github.com/Maxxxxior" className="github-avatar">
                        <img style={{ height: "auto" }} alt="github.com/Maxxxxior" src="assets\images\github_pfp.svg" width="32" height="32" />
                    </a>
                    <a href="https://github.com/Maxxxxior" className="github-nickname">
                        <span>Maxxxxior</span>
                    </a>
                </div>
            </div>
            {/* #endregion */}

            <button id="burgerBtn" className="burger" aria-label="Menu" onClick={() => setIsBurgerActive(!isBurgerActive)}>{isBurgerActive ? "✕" : "☰"}</button>

            {
                // #region Actions Wrapper
            }
            <div className={`actionsWrapper ${isBurgerActive ? 'active' : ''}`}>
                <div className={`actions ${isBurgerActive ? 'active' : ''}`}>
                    {currentPage !== 'home' && (
                        <button type="button" id="homeBtn" className="btn" aria-label="Home" onClick={() => navigateTo('home')}>{t('home')}</button>
                    )}
                    <button type="button" id="aboutMeBtn" className="btn" aria-label="About me" onClick={() => navigateTo('about')}>{t('aboutMe')}</button>
                    {/* <button type="button" id="newSubPageBtn" className="btn" aria-label="New SubPage" onClick={() => navigateTo('newsubpage')}>{t('newSubPage')}</button> */}
                    <div className="dropdown">
                        <button className="dropBtn" onClick={handleDropdownClick}>{t('repos')}</button>
                        <div className={`dropdown-content ${isDropdownShow ? 'show' : ''}`}>
                            {REPOSITORIES_DATA.map((repo) => (
                                <a key={repo.name} href={repo.url} className="repoDrop" id="repoDrop" onClick={() => { setIsBurgerActive(false); setIsDropdownShow(false); }}>
                                    <span>{repo.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    <button onClick={toggleTheme} type="button" id="themeBtn" className="btn" aria-label="Przełącz motyw">{t('changeTheme')}</button>
                    <button onClick={toggleLang} type="button" id="langBtn" className="btn" aria-label="Przełącz język">{lang === 'pl' ? 'EN' : 'PL'}</button>
                </div>
            </div>
            {/* #endregion */}
            {
                // #region Right Side
            }
            {/* <div className="rightSide">
            </div> */}
            {/* #endregion */}
        </header>
    )
}