'use client';

import { HistogramData } from '@/types/api/histogramData';
import { useState, useEffect } from 'react';
import { convertMonthName } from '@/utils/convertMonthName';
import { calculateAxisSteps } from '@/utils/calculateAxisSteps';
import Select from '../Select';
import styles from './Histogram.module.css';

const getDay = (day: string, i: number, daysLength: number) => {
  // Если (день кратен 5 и при этом не предпоследний) или если день первый или последний
  if ((+day % 5 === 0 && i !== daysLength - 2) || i === 0 || i === daysLength - 1) {
    return day.length === 1 ? `0${day}` : day; // если нужно, добавляем 0 спереди дня
  } else {
    return '';
  }
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
  const [columns, setColumns] = useState<number[]>();

  useEffect(() => {
    let xAxisLabels: string[] = [];
    let yAxisLabels: number[] = [];
    let columns: number[] = [];

    switch (selectedFilter) {
      case Filter.LastYear: {
        const numbers = Array.from(Object.values(data.year));
        xAxisLabels = Object.keys(data.year).map(name => convertMonthName(name));
        yAxisLabels = numbers;
        columns = numbers;
        break;
      }
      case Filter.Last6Months: {
        const numbers = Array.from(Object.values(data.half_year));
        xAxisLabels = Object.keys(data.half_year).map(name => convertMonthName(name));
        yAxisLabels = numbers;
        columns = numbers;
        break;
      }
      case Filter.LastMonth: {
        const numbers = Array.from(Object.values(data.month));
        const days = Object.keys(data.month);
        xAxisLabels = days.map((day, i) => getDay(day, i, days.length));
        yAxisLabels = numbers;
        columns = numbers;
        break;
      }
    }

    setXAxisLabels(xAxisLabels)
    setYAxisLabels(calculateAxisSteps(Math.min(...yAxisLabels), Math.max(...yAxisLabels), 6));
    setColumns(columns);
  }, [selectedFilter, data])

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
        {xAxisLabels && yAxisLabels && columns &&
          <>
            <div className={styles.y_axis_block}>
              {[...yAxisLabels].reverse().map((label, i) => <span key={i}>{label}</span>)}
            </div>

            <div className={styles.histogram}>
              {columns.map((column, i) => {
                const maxLabelNumber = yAxisLabels[yAxisLabels.length - 1];
                const minLabelNumber = yAxisLabels[0];
                const range = maxLabelNumber - minLabelNumber;
                const height = `${(column - minLabelNumber) / range * 100}%`;
                return (
                  <div key={i} className={styles.column} style={{ height }}>
                    <div className={styles.column_tooltip}>{column}</div>
                  </div>
                );
              })}
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
