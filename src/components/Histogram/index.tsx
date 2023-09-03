'use client';

import { HistogramData } from '@/types/api/histogramData';
import { useState, useEffect } from 'react';
import { convertMonthName } from '@/utils/convertMonthName';
import { calculateAxisSteps } from '@/utils/calculateAxisSteps';
import Select from '../Select';
import styles from './Histogram.module.css';

const getDays = (days: string[]) => {
  return days.map((day, i) => {
    // Если (день кратен 5 и при этом не предпоследний) или если день первый или последний
    if ((+day % 5 === 0 && i !== days.length - 2) || i === 0 || i === days.length - 1) {
      return day.length === 1 ? `0${day}` : day; // если нужно, добавляем 0 спереди дня
    } else {
      return '';
    }
  });
};

enum Filter {
  LastYear = 'last_year',
  Last6Months = 'last_6_months',
  LastMonth = 'last_month',
}

type Props = {
  data: HistogramData['graph'];
};

function Histogram({ data }: Props) {
  const [selectedFilter, setSelectedFilter] = useState<string>(Filter.LastYear);
  const [xAxisLabels, setXAxisLabels] = useState<string[]>();
  const [yAxisLabels, setYAxisLabels] = useState<number[]>();
  const [columnNumbers, setColumnNumbers] = useState<number[]>();

  useEffect(() => {
    let xAxisLabels: string[] = [];
    let yAxisLabels: number[] = [];
    let columnNumbers: number[] = [];

    switch (selectedFilter) {
      case Filter.LastYear: {
        const numbers = Array.from(Object.values(data.year));
        xAxisLabels = Object.keys(data.year).map(name => convertMonthName(name));
        yAxisLabels = numbers;
        columnNumbers = numbers;
        break;
      }
      case Filter.Last6Months: {
        const numbers = Array.from(Object.values(data.half_year));
        xAxisLabels = Object.keys(data.half_year).map(name => convertMonthName(name));
        yAxisLabels = numbers;
        columnNumbers = numbers;
        break;
      }
      case Filter.LastMonth: {
        const numbers = Array.from(Object.values(data.month));
        xAxisLabels = getDays(Object.keys(data.month))
        yAxisLabels = numbers;
        columnNumbers = numbers;
        break;
      }
    }

    setXAxisLabels(xAxisLabels)
    setYAxisLabels(calculateAxisSteps(Math.min(...yAxisLabels), Math.max(...yAxisLabels), 6));
    setColumnNumbers(columnNumbers);

    // Сброс анимации на всех колонках
    const columnsElements = document.getElementsByClassName(styles.column) as HTMLCollectionOf<HTMLDivElement>;
    for (let i = 0; i < columnsElements.length; i++) {
      columnsElements[i].style.animation = 'none';
      columnsElements[i].offsetHeight; /* trigger reflow */
      columnsElements[i].style.animation = '';
    }
  }, [selectedFilter, data])

  const getColumns = () => {
    if (yAxisLabels && columnNumbers) {
      return columnNumbers.map((columnNumber, i) => {
        const maxLabelNumber = yAxisLabels[yAxisLabels.length - 1];
        const minLabelNumber = yAxisLabels[0];
        const range = maxLabelNumber - minLabelNumber;
        const height = `${(columnNumber - minLabelNumber) / range * 100}%`;
        return (
          <div key={i} className={styles.column_container} style={{ height }}>
            <div className={styles.column}>
              <div className={styles.column_tooltip}>{columnNumber}</div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.select_container}>
        <Select
          width={380}
          items={[
            { key: Filter.LastYear, value: 'За последний год' },
            { key: Filter.Last6Months, value: 'За последние 6 месяцев' },
            { key: Filter.LastMonth, value: 'За последний месяц' },
          ]}
          defaultItem={selectedFilter}
          onSelect={(value: string) => setSelectedFilter(value)}/>
      </div>

      <div className={styles.histogram_container}>
        {xAxisLabels && yAxisLabels &&
          <>
            <div className={styles.y_axis_block}>
              {[...yAxisLabels].reverse().map((label, i) => <span key={i}>{label}</span>)}
            </div>

            <div className={styles.histogram}>
              {getColumns()}
            </div>

            <div></div> {/* Пустой блок для правильных пропорций */}

            <div className={styles.x_axis_block}>
              {xAxisLabels.map((label, i) => <div key={i}>{label}</div>)}
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default Histogram;
