import React from 'react';
import { useParams } from 'react-router-dom';

const Purchase = () => {
  const { toolId } = useParams();
  return (
    <div className="min-h-[calc(100vh-300px)]">
      <h1>Buy Now</h1>
    </div>
  );
};

export default Purchase;
