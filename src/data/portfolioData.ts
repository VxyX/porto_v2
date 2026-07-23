// data/portfolioData.ts
import { idData } from './locales/id';
import { enData } from './locales/en';
import { jpData } from './locales/jp';
import type { Language } from '../stores/langStore';

export const portfolioLocales = {
  id: idData,
  en: enData,
  jp: jpData,
};

export const getPortfolioData = (lang: Language = 'id') => {
  return portfolioLocales[lang] || portfolioLocales.id;
};

// Fallback default export matching initial state
export const personalInfo = idData.personalInfo;
export const skills = idData.skills;
export const projects = idData.projects;
export const socialMedia = [
  { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  { platform: 'Dribbble', url: 'https://dribbble.com', icon: 'dribbble' }
];