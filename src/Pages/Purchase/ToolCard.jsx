import React from 'react';

const ToolCard = ({
  tool: {
    _id,
    toolName,
    toolDescription,
    price,
    minQuantity,
    available,
    imageUrl,
  },
}) => {
  return (
    <div className="card card-compact w-11/12 max-w-sm bg-base-100 shadow-xl">
      <figure>
        <img src={imageUrl} alt={toolName} />
      </figure>
      <div className="card-body flex flex-col">
        <h2 className="card-title text-2xl">{toolName}</h2>
        <p className="text-lg font-normal">{toolDescription}</p>
        <div className="divider divider-vertical"></div>
        <p className="text-base">
          Minimum Order Quantity:{' '}
          <span className="font-bold text-lg">{minQuantity}</span>
        </p>
        <p className="text-base">
          Total Available:{' '}
          <span className="font-bold text-lg">{available}</span>
        </p>
        <p className="text-base">
          Price per unit: <span className="font-bold text-lg">${price}</span>
        </p>
      </div>
    </div>
  );
};

export default ToolCard;
