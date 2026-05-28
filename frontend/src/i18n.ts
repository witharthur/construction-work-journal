export type Language = "en" | "ru";

export interface Translation {
  appTitle: string;
  appSubtitle: string;
  switchToDarkMode: string;
  switchToLightMode: string;
  switchLanguage: string;
  languageButtonLabel: string;
  workEntries: string;
  recordsInCurrentView: (total: number) => string;
  createEntry: string;
  entries: string;
  workers: string;
  totalVolume: string;
  search: string;
  date: string;
  sort: string;
  newestFirst: string;
  oldestFirst: string;
  clear: string;
  clearFilters: string;
  loadError: string;
  loadingEntries: string;
  emptyTitle: string;
  emptyDescription: string;
  entryCount: (total: number) => string;
  tableAriaLabel: string;
  workType: string;
  volume: string;
  volumeUnit: string;
  unit: string;
  unitPlaceholder: string;
  worker: string;
  workerFullName: string;
  actions: string;
  editEntry: string;
  deleteEntry: string;
  editWorkEntry: string;
  createWorkEntry: string;
  cancel: string;
  saveChanges: string;
  deleteTitle: string;
  deleteDescription: (workType: string, workerName: string) => string;
  deleteFallback: string;
  deleteConfirm: string;
  createdToast: string;
  updatedToast: string;
  deletedToast: string;
  validation: {
    dateRequired: string;
    workTypeRequired: string;
    volumeRequired: string;
    volumeNumeric: string;
    volumePositive: string;
    unitRequired: string;
    workerNameRequired: string;
  };
}

export const translations = {
  en: {
    appTitle: "Construction Work Journal",
    appSubtitle: "Daily site production tracking",
    switchToDarkMode: "Switch to dark mode",
    switchToLightMode: "Switch to light mode",
    switchLanguage: "Switch language",
    languageButtonLabel: "RU",
    workEntries: "Work Entries",
    recordsInCurrentView: (total: number) => `${total} records in the current view`,
    createEntry: "Create Entry",
    entries: "Entries",
    workers: "Workers",
    totalVolume: "Total Volume",
    search: "Search",
    date: "Date",
    sort: "Sort",
    newestFirst: "Newest first",
    oldestFirst: "Oldest first",
    clear: "Clear",
    clearFilters: "Clear filters",
    loadError: "Entries could not be loaded.",
    loadingEntries: "Loading work entries",
    emptyTitle: "No work entries found",
    emptyDescription: "Add the first completed work record for this site day.",
    entryCount: (total: number) => `${total} entries`,
    tableAriaLabel: "Work entries table",
    workType: "Work type",
    volume: "Volume",
    volumeUnit: "Volume + Unit",
    unit: "Unit",
    unitPlaceholder: "m3, m2, kg, pcs",
    worker: "Worker",
    workerFullName: "Worker full name",
    actions: "Actions",
    editEntry: "Edit entry",
    deleteEntry: "Delete entry",
    editWorkEntry: "Edit Work Entry",
    createWorkEntry: "Create Work Entry",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    deleteTitle: "Delete work entry",
    deleteDescription: (workType: string, workerName: string) =>
      `Remove ${workType} for ${workerName}?`,
    deleteFallback: "Remove this work entry?",
    deleteConfirm: "Delete Entry",
    createdToast: "Work entry created.",
    updatedToast: "Work entry updated.",
    deletedToast: "Work entry deleted.",
    validation: {
      dateRequired: "Date is required.",
      workTypeRequired: "Work type is required.",
      volumeRequired: "Volume is required.",
      volumeNumeric: "Volume must be numeric.",
      volumePositive: "Volume must be positive.",
      unitRequired: "Unit is required.",
      workerNameRequired: "Worker full name is required."
    }
  },
  ru: {
    appTitle: "Журнал строительных работ",
    appSubtitle: "Ежедневный учет выполненных работ",
    switchToDarkMode: "Включить темную тему",
    switchToLightMode: "Включить светлую тему",
    switchLanguage: "Переключить язык",
    languageButtonLabel: "EN",
    workEntries: "Записи работ",
    recordsInCurrentView: (total: number) => `Записей в текущем виде: ${total}`,
    createEntry: "Создать запись",
    entries: "Записи",
    workers: "Рабочие",
    totalVolume: "Общий объем",
    search: "Поиск",
    date: "Дата",
    sort: "Сортировка",
    newestFirst: "Сначала новые",
    oldestFirst: "Сначала старые",
    clear: "Очистить",
    clearFilters: "Очистить фильтры",
    loadError: "Не удалось загрузить записи.",
    loadingEntries: "Загрузка записей работ",
    emptyTitle: "Записи не найдены",
    emptyDescription: "Добавьте первую запись о выполненных работах за день.",
    entryCount: (total: number) => `Записей: ${total}`,
    tableAriaLabel: "Таблица записей работ",
    workType: "Вид работ",
    volume: "Объем",
    volumeUnit: "Объем + ед.",
    unit: "Ед. изм.",
    unitPlaceholder: "м3, м2, кг, шт",
    worker: "Рабочий",
    workerFullName: "ФИО рабочего",
    actions: "Действия",
    editEntry: "Редактировать запись",
    deleteEntry: "Удалить запись",
    editWorkEntry: "Редактировать запись",
    createWorkEntry: "Создать запись",
    cancel: "Отмена",
    saveChanges: "Сохранить",
    deleteTitle: "Удалить запись",
    deleteDescription: (workType: string, workerName: string) =>
      `Удалить ${workType} для ${workerName}?`,
    deleteFallback: "Удалить эту запись?",
    deleteConfirm: "Удалить",
    createdToast: "Запись создана.",
    updatedToast: "Запись обновлена.",
    deletedToast: "Запись удалена.",
    validation: {
      dateRequired: "Укажите дату.",
      workTypeRequired: "Укажите вид работ.",
      volumeRequired: "Укажите объем.",
      volumeNumeric: "Объем должен быть числом.",
      volumePositive: "Объем должен быть больше нуля.",
      unitRequired: "Укажите единицу измерения.",
      workerNameRequired: "Укажите ФИО рабочего."
    }
  }
} satisfies Record<Language, Translation>;
