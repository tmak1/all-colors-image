import React, { useState, useEffect, createContext } from 'react';

import { initColors, initGrid, initPoint } from './lib';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [sort, setSort] = useState('color');
  const [steps, setSteps] = useState(32);
  const [colors, setColors] = useState(() => initColors(steps, sort));
  const [width, setWidth] = useState(256);
  const [height, setHeight] = useState(128);
  const fps = 60;
  const grid = initGrid({ width, height });
  const prevPositions = [];

  const placeImage = (ctx, imageData) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    ctx.putImageData(imageData, 0, 0);
  };

  const paint = (ctx, currentPos, imageData) => {
    const color = colors?.pop();
    grid[currentPos.x][currentPos.y] = 1;
    const offset = (currentPos.x + currentPos.y * width) * 4;
    if (color) {
      imageData.data[offset + 0] = color.r;
      imageData.data[offset + 1] = color.g;
      imageData.data[offset + 2] = color.b;
      imageData.data[offset + 3] = 255;
      ctx.putImageData(imageData, 0, 0);
    }
  };

  const findFreeSpace = ({ x, y }) => {
    let freeSpace = [];
    if (x > 0) {
      if (grid[x - 1][y] == 0) {
        freeSpace.push(initPoint(x - 1, y));
      }
    } else if (grid[width - 1][y] == 0) {
      freeSpace.push(initPoint(width - 1, y));
    }

    if (x < width - 1) {
      if (grid[x + 1][y] === 0) {
        freeSpace.push(initPoint(x + 1, y));
      }
    } else if (grid[0][y] === 0) {
      freeSpace.push(initPoint(0, y));
    }

    if (y > 0) {
      if (grid[x][y - 1] === 0) {
        freeSpace.push(initPoint(x, y - 1));
      }
    } else if (grid[x][height - 1] === 0) {
      freeSpace.push(initPoint(x, height - 1));
    }

    if (y < height - 1) {
      if (grid[x][y + 1] === 0) {
        freeSpace.push(initPoint(x, y + 1));
      }
    } else if (grid[x][0] === 0) {
      freeSpace.push(initPoint(x, 0));
    }
    return freeSpace;
  };

  useEffect(() => {
    setColors(initColors(steps, sort));
  }, [steps, sort]);

  return (
    <AppContext.Provider
      value={{
        fps,
        prevPositions,
        width,
        height,
        setWidth,
        setHeight,
        setSteps,
        setSort,
        findFreeSpace,
        paint,
        placeImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
