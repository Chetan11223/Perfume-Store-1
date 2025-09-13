import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image shimmer"></div>
      <div className="skeleton-text shimmer"></div>
      <div className="skeleton-text short shimmer"></div>
      <div className="skeleton-text long shimmer"></div>
      <div className="skeleton-text short shimmer"></div>
    </div>
  );
};

export default LoadingSkeleton;