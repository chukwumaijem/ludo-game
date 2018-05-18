import React from 'react';
import { setSelectedSeed } from '../actions';
import store from '../store';

export function buildRails(col, row, size, position, colour, seedData) {
  const boxSize = size / 3;
  const railBox = [];
  const className = `railbox`;
  let colourBoxes;
  let count = 1;
  const extendClassName = `${className} box-${colour}`;

  switch (position) {
    case 'VT':
      colourBoxes = [5, 6, 8, 11, 14, 17];
      break;
    case 'VB':
      colourBoxes = [2, 5, 8, 11, 13, 14];
      break;
    case 'HR':
      colourBoxes = [7, 8, 9, 10, 11, 17];
      break;
    case 'HL':
      colourBoxes = [2, 8, 9, 10, 11, 12];
      break;
    default:
      return;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const seedPosition = `${position}-${i}${j}`;
      let boxColourClass = className;
      if (colourBoxes.indexOf(count) >= 0) {
        boxColourClass = extendClassName;
      }
      railBox.push(<div
        id={seedPosition}
        className={boxColourClass}
        style={{ width: boxSize, height: boxSize }}
        key={`${i}${j}`}>
        {buildSeed(seedPosition, seedData, size)}
      </div>);
      count++;
    }
  }

  return railBox;
}

// The size of the seed is a breakdown of
// (size/3 - (size * 0.25))/4
// based on size of the box = size/3
// and size of seed = size/4
function buildSeed(seedPosition, seedData, size) {
  let seed;
  const seedSize = size * 0.25;
  const boxSize = size / 3;

  Object.keys(seedData).forEach((item, index) => {
    if (seedData[item].position === seedPosition) {
      const houseColour = seedData[`${item.substr(0, 2)}-Colour`];
      seed = <div
        className={`house-seeds house-colour-${houseColour}`}
        style={{
          width: `${seedSize}px`,
          height: `${seedSize}px`,
          margin: `${(boxSize * 0.12)}px`,
          textAlign: 'center',
          color: 'white',
          lineHeight: `${seedSize}px`,
        }}
        onClick={() => store.dispatch(setSelectedSeed(item))}
      >
        {item.substr(4, 1)}
      </div>
    }
  });
  return seed;
}