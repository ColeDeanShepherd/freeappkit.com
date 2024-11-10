export interface LocalizedString {
  en: string;
  es?: string;
}

export type MaybeLocalizedString = string | LocalizedString;

let language = 'en';

export function setLanguage(lang: string) {
  language = lang;
}

export function translate(str: MaybeLocalizedString) {
  if (typeof str === 'string') {
    return str;
  } else {
    const _str = str as any;

    if (_str[language] !== undefined) {
      return _str[language];
    } else {
      return _str.en;
    }
  }
}

export function toLocalizedString(str: MaybeLocalizedString): LocalizedString {
  if (typeof str === 'string') {
    return { en: str };
  } else {
    return str;
  }
}