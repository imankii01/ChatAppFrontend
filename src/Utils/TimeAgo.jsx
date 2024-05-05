import React from 'react';

const TimeAgo = ({ timestamp }) => {
  const getTimeAgo = (timestamp) => {
    const currentDate = new Date();
    const createdDate = new Date(timestamp);
    const timeDifference = currentDate - createdDate;
    
    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);
    
    if (seconds < 60) {
      return 'just now';
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return <span>{getTimeAgo(timestamp)}</span>;
};

export default TimeAgo;
