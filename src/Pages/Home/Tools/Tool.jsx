import React from 'react';
import { Link } from 'react-router-dom';

const Tool = ({
  tool: {
    _id,
    toolName,
    toolDescription,
    minQuantity,
    available,
    price,
    imageUrl,
  },
  isLastOdd,
}) => {
  console.log('ODD', isLastOdd);
  return (
    <div
      className={`relative h-[600px] text-black ${
        isLastOdd ? 'md:col-span-2' : ''
      }`}
    >
      <img
        className="w-full h-full object-center object-cover"
        src={imageUrl}
        alt={toolName}
      />
      <div className="absolute bottom-5 left-3 md:left-10 lg:bottom-10 lg:left-20 text-secondary shadow">
        <div className="bg-base-100 bg-opacity-80 p-4 rounded flex flex-col gap-2">
          <h1 className="text-2xl mb-2 font-bold">{toolName}</h1>
          <p className="text-xl">
            {toolDescription.slice(0, 25)}{' '}
            {toolDescription.length >= 25 && (
              <Link className="hover:text-white" to={`/tools/${_id}`}>
                ...
              </Link>
            )}
          </p>
          <p className="">
            Minimum Order Quantity:{' '}
            <span className="font-extrabold text-lg">{minQuantity}</span>
          </p>
          <p className="">
            Total Available:{' '}
            <span className="font-extrabold text-lg">{available}</span>
          </p>
          <p className="">
            Price Per Unit:{' '}
            <span className="font-extrabold text-lg">${price}</span>
          </p>
          <Link to={`/tools/${_id}`}>
            <button className="button-style-1 mt-2">Order Now!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tool;
