import React from 'react';
import range from 'lodash.range';

import styles from './PrideFlag.module.css';
import { COLORS } from './constants';

function PrideFlag({
  variant = 'rainbow', // rainbow | rainbow-original | trans | pan
  width = 200,
  numOfColumns = 10,
  staggeredDelay = 100,
  billow = 2,
}) {
  const colors = COLORS[variant];

  const friendlyWidth =
    Math.round(width / numOfColumns) * numOfColumns;

  const firstColumnDelay = numOfColumns * staggeredDelay * -1;

  return (
    <div className={styles.flag} style={{ width: friendlyWidth }}>
      {range(numOfColumns).map((columnIndex) => (
        <div
          key={columnIndex}
          className={styles.column}
          style={{
            '--billow': columnIndex * billow + 'px',
            background: generateGradientString(colors),
            animationDelay:
              firstColumnDelay + columnIndex * staggeredDelay + 'ms',
          }}
        />
      ))}
    </div>
  );
}

function generateGradientString(colors) {
  const numOfColors = colors.length;
  const segmentHeight = 100 / numOfColors;

  const gradientStops = colors.map((color, index) => {
    const from = index * segmentHeight;
    const to = (index + 1) * segmentHeight;

    return `${color} ${from}% ${to}%`;
  });

  return `linear-gradient(to bottom, ${gradientStops.join(', ')})`;
}

export default PrideFlag;