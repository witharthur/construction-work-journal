import type { Language } from "../../i18n";
import type { WorkType } from "../../types/workEntry";

const DEFAULT_WORK_TYPES = [
  "Concrete Pour",
  "Rebar Installation",
  "Formwork",
  "Masonry",
  "Excavation",
  "Backfilling",
  "Waterproofing",
  "Electrical Rough-In",
  "Plumbing Rough-In"
];

const WORK_TYPE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  "Concrete Pour": {
    en: "Concrete Pour",
    ru: "Бетонирование"
  },
  "Rebar Installation": {
    en: "Rebar Installation",
    ru: "Монтаж арматуры"
  },
  Formwork: {
    en: "Formwork",
    ru: "Монтаж опалубки"
  },
  Masonry: {
    en: "Masonry",
    ru: "Кладочные работы"
  },
  Excavation: {
    en: "Excavation",
    ru: "Земляные работы"
  },
  Backfilling: {
    en: "Backfilling",
    ru: "Обратная засыпка"
  },
  Waterproofing: {
    en: "Waterproofing",
    ru: "Гидроизоляция"
  },
  "Electrical Rough-In": {
    en: "Electrical Rough-In",
    ru: "Черновой электромонтаж"
  },
  "Plumbing Rough-In": {
    en: "Plumbing Rough-In",
    ru: "Черновая сантехника"
  }
};

export function getLocalizedWorkTypeOptions(workTypes: WorkType[], language: Language): string[] {
  const sourceNames = workTypes.length > 0 ? workTypes.map((workType) => workType.name) : DEFAULT_WORK_TYPES;
  const localizedNames = sourceNames.map((name) => WORK_TYPE_TRANSLATIONS[name]?.[language] ?? name);

  return Array.from(new Set(localizedNames)).sort((firstName, secondName) =>
    firstName.localeCompare(secondName, language)
  );
}
