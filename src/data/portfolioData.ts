// data/portfolioData.ts
import { idData } from './locales/id';
import { enData } from './locales/en';
import { jpData } from './locales/jp';
import type { Language } from '../stores/langStore';

export interface SocialLink {
  id: string;
  platform: string;
  handle: string;
  url: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  shortIcon: string;
}

export const socialLinks = [
  {
    id: 'github',
    platform: 'GitHub',
    handle: 'VxyX',
    url: 'https://github.com/VxyX',
    description: {
      id: 'Jelajahi repositori kode & proyek open source',
      en: 'Explore code repositories & open source projects',
      jp: 'コードリポジトリとオープンソースプロジェクトを探索',
    },
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.15)',
    borderColor: 'rgba(168, 85, 247, 0.35)',
    icon: 'github',
    shortIcon: 'G',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'Muhammad Farhan Roesfiazhar',
    url: 'https://www.linkedin.com/in/muhammad-farhan-roesfiazhar-a8140624b/',
    description: {
      id: 'Terhubung secara profesional & lihat riwayat kerja',
      en: 'Connect professionally & view work history',
      jp: 'プロフェッショナルに繋がり、職歴を閲覧',
    },
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.35)',
    icon: 'linkedin',
    shortIcon: 'L',
  },
  // {
  //   id: 'twitter',
  //   platform: 'Twitter / X',
  //   handle: '@farhan',
  //   url: 'https://twitter.com',
  //   description: {
  //     id: 'Ikuti diskusi teknologi & pembaruan harian',
  //     en: 'Follow tech discussions & daily updates',
  //     jp: '技術ディスカッションと日々の更新をフォロー',
  //   },
  //   color: '#38bdf8',
  //   bgColor: 'rgba(56, 189, 248, 0.15)',
  //   borderColor: 'rgba(56, 189, 248, 0.35)',
  //   icon: 'twitter',
  //   shortIcon: 'X',
  // },
  // {
  //   id: 'dribbble',
  //   platform: 'Dribbble / Artwork',
  //   handle: '@farhan_art',
  //   url: 'https://dribbble.com',
  //   description: {
  //     id: 'Lihat karya seni digital & gambar kreatif',
  //     en: 'View digital drawings & creative WIPs',
  //     jp: 'デジタルアートワークとクリエイティブな作品を閲覧',
  //   },
  //   color: '#ec4899',
  //   bgColor: 'rgba(236, 72, 153, 0.15)',
  //   borderColor: 'rgba(236, 72, 153, 0.35)',
  //   icon: 'dribbble',
  //   shortIcon: 'D',
  // },
];

export const portfolioLocales = {
  id: idData,
  en: enData,
  jp: jpData,
};

export const getPortfolioData = (lang: Language = 'id') => {
  const localeData = portfolioLocales[lang] || portfolioLocales.id;
  const localizedSocialLinks: SocialLink[] = socialLinks.map((item) => ({
    ...item,
    description: item.description[lang] || item.description.en || item.description.id,
  }));

  return {
    ...localeData,
    socialLinks: localizedSocialLinks,
  };
};

// Fallback default export matching initial state
export const personalInfo = idData.personalInfo;
export const skills = idData.skills;
export const projects = idData.projects;