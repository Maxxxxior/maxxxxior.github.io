import type { TranslationKey } from '../locales/i18nData';

export interface Repository {
    name: string;
    url: string;
    description: TranslationKey;
    langName: string;
    langClass: string;
    inDevelopment?: boolean;
}

export const REPOSITORIES_DATA: Repository[] = [
    { name: 'base64deencoder', url: 'https://github.com/Maxxxxior/base64deencoder', description: 'repoBase64', langName: 'Python', langClass: 'python' },
    { name: 'DiscordBotGB', url: 'https://github.com/Maxxxxior/DiscordBotGB', description: 'repoDiscordBotGB', langName: 'Python', langClass: 'python' },
    { name: 'FunkyChat', url: 'https://github.com/Maxxxxior/FunkyChat', description: 'repoFunkyChat', langName: 'JavaScript', langClass: 'javascript' },
    { name: 'ImageToText', url: 'https://github.com/Maxxxxior/ImageToText', description: 'repoImageToText', langName: 'Python', langClass: 'python' },
    { name: 'maxxxxior.github.io', url: 'https://github.com/Maxxxxior/maxxxxior.github.io', description: 'repoMaxxxxiorGithubIO', langName: 'HTML', langClass: 'html' },
    { name: 'MaxChatbot', url: 'https://github.com/Maxxxxior/MaxChatbot', description: 'repoMaxChatbot', langName: 'HTML', langClass: 'html' },
    { name: 'SAM', url: 'https://github.com/Maxxxxior/SAM', description: 'repoSAM', langName: 'CSS', langClass: 'css' },
    { name: 'SpisPomieszczenWChUW', url: 'https://github.com/Maxxxxior/SpisPomieszczenWChUW', description: 'repoWChUW', langName: 'HTML', langClass: 'html', inDevelopment: true },
    // { name: 'template', url: 'https://github.com/Maxxxxior/template', description: 'template', langName: 'Template', langClass: 'template', inDevelopment: true/false },
];