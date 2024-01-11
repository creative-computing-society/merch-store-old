import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment progress value
      setProgressValue((prevValue) => (prevValue + 0.1 > 1 ? 0 : prevValue + 0.1));
    }, 100); // Adjust the interval and increment value as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-container">
      <progress value={progressValue} />
    </div>
  );
};

export default ProgressBar;