import { useState, useEffect } from 'react';
import { I18N, type Language, type TranslationKey } from '../locales/i18nData';

export function useLanguage() {
    const [lang, setLang] = useState<Language>(() => {
        return (localStorage.getItem('lang') as Language) || 'pl';
    });

    useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);

    const toggleLang = () => {
        setLang((prev) => (prev === 'pl' ? 'en' : 'pl'));
    };

    const t = (key: TranslationKey): string => {
        return I18N[lang][key] || key;
    };

    return { lang, toggleLang, t };
}