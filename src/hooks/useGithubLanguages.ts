import { useState, useEffect } from 'react';
import type { Repository } from '../data/repositories';

const CACHE_KEY = "repoLanguages";
const LAST_FETCH_KEY = "lastApiFetch";
const DEV_MODE = ["localhost", "127.0.0.1"].includes(location.hostname);
const CACHE_TIME = DEV_MODE ? 10 * 60 * 1000 : 10 * 60 * 1000; // 10 min locally, 10 min online
const GITHUB_OWNER = "Maxxxxior";

interface LanguageCache {
    [repoName: string]: string;
}

export function useGithubLanguages(repositories: Repository[]) {
    const [languages, setLanguages] = useState<{ [repoName: string]: string }>({});

    useEffect(() => {
        const fetchAllLanguages = async () => {
            let cacheData: LanguageCache | null = null;
            let lastFetch: number = 0;
            try {
                cacheData = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
                lastFetch = parseInt(localStorage.getItem(LAST_FETCH_KEY) || "0", 10);
            } catch (e) {
                console.error("Failed to parse cache data", e);
            }

            const shouldFetch = !cacheData || (Date.now() - lastFetch >= CACHE_TIME);

            if (!shouldFetch && cacheData) {
                setLanguages(cacheData);
                return;
            }

            const newCacheData: LanguageCache = {};

            for (const repo of repositories) {
                try {
                    const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${repo.name}/languages`);
                    if (!res.ok) throw new Error(`GitHub API error: ${repo.name}`);
                    const langData = await res.json();
                    const keys = Object.keys(langData);
                    if (keys.length > 0) {
                        const topLang = keys.sort((a, b) => langData[b] - langData[a])[0];
                        newCacheData[repo.name] = topLang;
                    } else {
                        newCacheData[repo.name] = "N/A";
                    }
                } catch (e) {
                    console.warn(e);
                    if (cacheData && cacheData[repo.name]) {
                        newCacheData[repo.name] = cacheData[repo.name];
                    } else {
                        newCacheData[repo.name] = "N/A";
                    }
                }
            }

            localStorage.setItem(CACHE_KEY, JSON.stringify(newCacheData));
            localStorage.setItem(LAST_FETCH_KEY, Date.now().toString());

            setLanguages(newCacheData);
        };

        fetchAllLanguages();
    }, [repositories]);

    return languages;
}