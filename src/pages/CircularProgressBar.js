import React, { useState, useEffect } from 'react';
import './CustomCircularProgressBar.css';

const CustomProgressBar = ({ value, size = 200, strokeWidth = 15 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedValue / 100) * circumference;

  const getGradientColor = (percentage) => {
    const blue = Math.floor(255 - (percentage * 2 - 100) * 255 / 100);
    const grey = Math.floor((percentage * 2) * 255 / 100);
    return `rgb(${blue},${grey},${grey})`;
  };

  useEffect(() => {
    console.log('Value prop in CustomProgressBar:', value); // Log the value prop to check if it updates correctly

    const animateProgress = () => {
      const interval = 50; // Interval duration in ms
      const duration = 1500; // Total duration of animation in ms
      const steps = duration / interval;
      const stepSize = (value - animatedValue) / steps; // Calculate step size based on the difference between the new value and the current animated value

      let stepCount = 0;
      const intervalId = setInterval(() => {
        stepCount += 1;
        setAnimatedValue((prevValue) =>
          Math.max(prevValue + stepSize, 0)
        );
        if (stepCount >= steps) {
          clearInterval(intervalId);
        }
      }, interval);
    };

    animateProgress();
  }, [value]);

  return (
    <div className="custom-progress-container" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: getGradientColor(0), stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: getGradientColor(animatedValue), stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle
          className="progress-ring-background"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-ring"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          stroke="url(#gradient)"
        />
        <circle
          className="inner-progress-ring"
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth - 5}
          strokeWidth={strokeWidth / 2}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </svg>
      <div className="progress-text">
        <span className="progress-value">{`${Math.max(animatedValue, 0).toFixed(2)}%`}</span>
      </div>
    </div>
  );
};

export default CustomProgressBar;
