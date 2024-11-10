export interface LocalizedString {
  en: string;
  es: string;
}

export const strings = {
  convertToUpperCase: {
    en: "Convert to Uppercase",
    es: "Convertir a Mayúsculas",
  }
};

let language = 'en';

export function setLanguage(lang: string) {
  language = lang;
}

export function translate(str: LocalizedString) {
  return (str as any)[language];
}