import React from 'react';
import { LoadingWrapper } from './Index.styled';

const LoadingComponent: React.FC = () => {
  return (
    <LoadingWrapper>
      <div className="loading-dot-container">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </LoadingWrapper>
  );
};

export default LoadingComponent;
