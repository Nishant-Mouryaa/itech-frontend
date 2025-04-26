// Boiler plate for Progress component

import React from 'react';
import { useState, useEffect } from 'react';


const Progress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate fetching progress data from an API
    const fetchProgress = () => {
      // Replace with actual API call
      const fetchedProgress = Math.floor(Math.random() * 100);
      setProgress(fetchedProgress);
    };

    fetchProgress();
  }, []);

  return (
    <div className="progress-container">
      <h2>Your Course Progress</h2>
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
}

export default Progress;