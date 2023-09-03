/**
 * Возвращает массив чсел (шагов) для размещения вдоль оси графика.
 * Количество полученных шагов иногда может быть больше или меньше изначального желаемого количества.
 * @param minValue минимальное значение вдоль оси
 * @param maxValue максимальное значение вдоль оси
 * @param ticks количество необходимых шагов
 * @returns массив шагов
 */
export const calculateAxisSteps = (minValue: number, maxValue: number, ticks: number): number[] => {
  let newMinValue = minValue;
  let newMaxValue = maxValue;
  if(minValue == maxValue) {
    newMinValue = minValue - 10; // отнимаем маленькое значение
    newMaxValue = maxValue + 10; // прибавляем маленькое значение
  }

  const range = newMaxValue - newMinValue;

  let newTicks = ticks;
  if (ticks < 2) newTicks = 2;
  else if (ticks > 2) newTicks -= 2;

  const tempStep = range / newTicks;

  const mag = Math.floor(Math.log10(tempStep));
  const magPow = Math.pow(10, mag);
  const magMsd = Math.floor(tempStep / magPow + 0.5);
  const stepSize = magMsd * magPow;

  const lowerBoundary = stepSize * Math.floor(newMinValue / stepSize);
  const upperBoundary = stepSize * Math.ceil(newMaxValue / stepSize);

  const result: number[] = [];

  for (let i = lowerBoundary; i <= upperBoundary; i += stepSize) {
    result.push(i);
  }

  return result;
}
