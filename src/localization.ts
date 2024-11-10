export interface LocalizedString {
  en: string;
  es?: string;
}

export type MaybeLocalizedString = string | LocalizedString;

const supportedLanguages = ['en', 'es'];

export function getFirstSupportedPreferredLanguage(): string {
  const preferredLanguages = navigator.languages;

  for (const preferredLanguage of preferredLanguages) {
    if (supportedLanguages.includes(preferredLanguage)) {
      return preferredLanguage;
    }
  }

  return 'en';
}

let language = 'en';

export function setLanguage(lang: string) {
  language = lang;
}

export function getLanguage(): string {
  return language;
}

let strings: { [key: string]: LocalizedString } = {};
let localizedStringsByEnglishString: { [key: string]: LocalizedString } = {};

export function setStrings(strings: { [key: string]: LocalizedString }) {
  strings = strings;

  localizedStringsByEnglishString = {};

  for (const key in strings) {
    const localizedString = strings[key];
    localizedStringsByEnglishString[localizedString.en] = localizedString;
  }
}

export function translate(str: MaybeLocalizedString) {
  const localizedString = toLocalizedString(str) as any;

  if (localizedString[language] !== undefined) {
    return localizedString[language];
  } else {
    return localizedString.en;
  }
}

export function toLocalizedString(str: MaybeLocalizedString): LocalizedString {
  if (typeof str === 'string') {
    if (localizedStringsByEnglishString[str] !== undefined) {
      return localizedStringsByEnglishString[str];
    } else {
      return { en: str };
    }
  } else {
    return str;
  }
}