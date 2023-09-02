'use client';

import { useState } from 'react';
import Image from 'next/image';
import arrowSvg from '../../../public/arrow.svg';
import styles from './Select.module.css';

type Props = {
  width: number;
  items: {
    key: string;
    value: string;
  }[];
  onSelect: (value: Props['items'][0]['key']) => void;
};

function Select({ width, items, onSelect }: Props) {
  const itemsMap: Record<string, string> = {};
  for (const item of items) {
    itemsMap[item.key] = item.value;
  }

  const [selectedValue, setSelectedValue] = useState(items[0].key);

  const onItemSelect = (key: string) => {
    setSelectedValue(key);
    onSelect(key);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} style={{ width: `${width}px` }}>
        <span className={styles.text}>{itemsMap[selectedValue]}</span>
        <Image className={styles.arrow} src={arrowSvg} alt='' />
      </button>

      <div className={styles.menu}>
        {items.filter(item => item.key !== selectedValue).map((item, i) => (
          <div
            key={i}
            className={styles.menu_item}
            onMouseDown={() => onItemSelect(item.key)}
          >{itemsMap[item.key]}</div>
        ))}
      </div>
    </div>
  );
}

export default Select;
