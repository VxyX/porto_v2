import { writable } from 'svelte/store';

export type Language = 'id' | 'en' | 'jp';

const getInitialLang = (): Language => {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('portfolio_lang') as Language;
    if (saved && (saved === 'id' || saved === 'en' || saved === 'jp')) {
      return saved;
    }
  }
  return 'id';
};

export const currentLang = writable<Language>(getInitialLang());

export function setLanguage(lang: Language) {
  currentLang.set(lang);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('portfolio_lang', lang);
  }
}
