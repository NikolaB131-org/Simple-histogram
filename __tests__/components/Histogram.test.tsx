import { render, screen } from '@testing-library/react';
import Histogram, { Props } from '@/components/Histogram';
import { calculateAxisSteps } from '@/utils/calculateAxisSteps';

describe('Histogram', () => {
  let props: Props;

  beforeEach(() => {
    props = {
      data: {
        year: {
          January: 3123,
          February: 561,
          March: 4341,
          April: 416,
          May: 8223,
          June: 531,
          July: 7428,
          August: 3272,
          September: 583,
          October: 9854,
          November: 366,
          December: 325,
        },
        half_year: {
          January: 3123,
          February: 561,
          March: 4341,
          April: 416,
          May: 8223,
          June: 531,
        },
        month: {
          1: 185,
          2: 101,
          3: 172,
          4: 165,
          5: 143,
          6: 125,
          7: 116,
          8: 177,
          9: 125,
          10: 180,
          11: 132,
          12: 196,
          13: 165,
          14: 160,
          15: 113,
          16: 138,
          17: 139,
          18: 172,
          19: 154,
          20: 140,
          21: 141,
          22: 169,
          23: 122,
          24: 139,
          25: 195,
          26: 128,
          27: 111,
          28: 138,
          29: 152,
          30: 124,
        },
      }
    };
  });

  test('рендерится правильно', () => {
    render(<Histogram {...props} />)

    // Проверка наличия обозначений вдоль оси x
    expect(screen.getByText('Янв')).toBeInTheDocument();
    expect(screen.getByText('Фев')).toBeInTheDocument();
    expect(screen.getByText('Март')).toBeInTheDocument();
    expect(screen.getByText('Апр')).toBeInTheDocument();
    expect(screen.getByText('Май')).toBeInTheDocument();
    expect(screen.getByText('Июнь')).toBeInTheDocument();
    expect(screen.getByText('Июль')).toBeInTheDocument();
    expect(screen.getByText('Авг')).toBeInTheDocument();
    expect(screen.getByText('Сент')).toBeInTheDocument();
    expect(screen.getByText('Окт')).toBeInTheDocument();
    expect(screen.getByText('Нояб')).toBeInTheDocument();
    expect(screen.getByText('Дек')).toBeInTheDocument();

    // Проверка наличия обозначений вдоль оси y
    const numbers = Object.values(props.data.half_year);
    const yAxisLabels = calculateAxisSteps(Math.min(...numbers), Math.max(...numbers), 6);
    yAxisLabels.forEach(label => expect(screen.getByText(label)).toBeInTheDocument());

    // Проверка наличия подсказок
    numbers.forEach(number => expect(screen.getByText(number)).toBeInTheDocument());
  });
});
