export interface LocalizedString {
  en: string;
  es: string;
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
    return (str as any)[language];
  }
}