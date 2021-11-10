import React, { useEffect, useRef, useContext } from 'react';

import { AppContext } from '../AppContextProvider';
import { initPoint } from '../lib';

import './Canvas.css';

const Canvas = () => {
  const canvasRef = useRef(null);
  const {
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
  } = useContext(AppContext);

  let ctx;
  let imageData;
  let currentPos = initPoint(
    Math.floor(Math.random() * width),
    Math.floor(Math.random() * height)
  );

  const update = () => {
    let completed = false;
    if (!completed) {
      for (let i = 0; i < fps * 15; i++) {
        while (true) {
          const availableSpaces = findFreeSpace(currentPos);
          if (availableSpaces.length > 0) {
            currentPos =
              availableSpaces[
                Math.floor(Math.random() * availableSpaces.length)
              ];
            paint(ctx, currentPos, imageData);
            prevPositions.push(currentPos);
            break;
          } else {
            if (prevPositions.length !== 0) {
              currentPos = prevPositions.pop();
            } else {
              completed = true;
              break;
            }
          }
        }
      }
    }
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    if (!width || !height) {
      return;
    }
    imageData = ctx.createImageData(width, height);
    paint(ctx, currentPos, imageData);
    prevPositions.push(currentPos);
    let interval = setInterval(() => {
      update();
      placeImage(ctx, imageData);
    }, 1000 / fps);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="main-container">
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="canvas"
          width={width}
          height={height}
        />
      </div>
      <div>
        <div className="btn-group">
          <div
            className="color-btn-group"
            onClick={(e) => e.target.id && setSort(e.target.id)}
          >
            <button id="color" className="control-btn" autoFocus>
              Color
            </button>
            <button id="hue" className="control-btn">
              Hue
            </button>
          </div>
          <div className="size-btn-group">
            <button
              className="control-btn"
              onClick={() => {
                setWidth(256);
                setHeight(128);
                setSteps(32);
              }}
            >
              256x128
            </button>
            <button
              className="control-btn"
              onClick={() => {
                setWidth(512);
                setHeight(256);
                setSteps(51);
              }}
            >
              512x256
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
