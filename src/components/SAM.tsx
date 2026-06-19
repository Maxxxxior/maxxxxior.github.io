import { useState, useEffect } from 'react';
import type { TranslationKey } from '../locales/i18nData';

interface SAMProps {
    t: (key: TranslationKey) => string;
}

export function SAM({ t }: SAMProps) {
    const [status, setStatus] = useState<string>("LOADING...");
    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

    useEffect(() => {
        const url = "https://huggingface.co/api/spaces/Maxxxxior/MaxChatbotBackend/runtime";

        const updateServiceStatus = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();

                const stage = data.stage; // np. "RUNNING"
                const gcTimeout = data.gcTimeout;

                setStatus(stage);

                if (stage === "RUNNING" && gcTimeout) {
                    setRemainingSeconds(gcTimeout);
                } else {
                    setRemainingSeconds(null);
                }
            } catch (e) {
                setStatus("ERROR");
                setRemainingSeconds(null);
                console.error(e);
            }
        };

        updateServiceStatus();
        const apiInterval = setInterval(updateServiceStatus, 60000);

        return () => clearInterval(apiInterval);
    }, []);

    useEffect(() => {
        if (remainingSeconds === null || remainingSeconds <= 0) return;

        const countdownInterval = setInterval(() => {
            setRemainingSeconds((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [remainingSeconds]);

    const formatCountdown = () => {
        if (remainingSeconds === null) return "";
        if (remainingSeconds === 0) return "Sleeping soon...";

        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="SAM">
            <h1 className="samTitle">{t('samTitle')}</h1>
            <div className="services">
                <div className="service">
                    <div className="serviceHeader">
                        <span className="material-symbols-outlined serviceIcon apicon">api</span>
                        <a href="https://huggingface.co/spaces/Maxxxxior/MaxChatbotBackend" className="serviceName">MaxChatbotBackend</a>
                    </div>
                    
                    <div className="serviceFooter">
                        <span className={`material-symbols-outlined serviceStatus maxChatbotBackend ${status.toLowerCase()}`}>circle</span>
                        <div className="status">{status}</div>
                        <div className="countdown">{formatCountdown()}</div>
                    </div>

                    <div className="badge">
                        <span className="material-symbols-outlined project-card-symbol info">api</span>
                        <span>{t('projectStatusAPI')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}