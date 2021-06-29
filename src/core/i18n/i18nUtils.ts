import i18n from 'i18next';

// eslint-disable-next-line import/prefer-default-export
export const changeLanguage = (language: string) => {
  return i18n.changeLanguage(language);
};
