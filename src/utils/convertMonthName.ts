export const convertMonthName = (engName: string): string => {
  const namesMap: Record<string, string> = {
    January: 'Янв',
    February: 'Фев',
    March: 'Март',
    April: 'Апр',
    May: 'Май',
    June: 'Июнь',
    July: 'Июль',
    August: 'Авг',
    September: 'Сент',
    October: 'Окт',
    November: 'Нояб',
    December: 'Дек',
  };

  if (Object.hasOwn(namesMap, engName)) {
    return namesMap[engName];
  } else {
    return engName;
  }
}
