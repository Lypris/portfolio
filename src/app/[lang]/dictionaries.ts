import "server-only";

export const getDictionary = async (locale: string) => {
  const dictionaries: { [key: string]: () => Promise<any> } = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    fr: () => import('./dictionaries/fr.json').then((module) => module.default),
    de: () => import('./dictionaries/de.json').then((module) => module.default),
  };

  // Utilise 'fr' si la locale n'existe pas dans les langues disponibles
  const loadDictionary = dictionaries[locale] || dictionaries['fr'];

  return loadDictionary();
};
