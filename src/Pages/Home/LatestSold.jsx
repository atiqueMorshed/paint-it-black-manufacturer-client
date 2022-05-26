import { format, parseISO } from 'date-fns';
import React from 'react';
import { useGetPublicData } from '../../Hooks/useGetPublicData';
import Spinner from '../Shared/Spinner';

const LatestSold = () => {
  const {
    isError,
    isFetching,
    isLoading,
    isRefetching,
    isSuccess,
    error,
    data,
  } = useGetPublicData({
    url: '/api/latestorder/',
    name: 'getLatestPublicOrders',
  });

  if (isLoading || isFetching || isRefetching) {
    return (
      <div id="tools" className="my-32 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Latest Orders
        </h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div id="tools" className="my-32 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Latest Orders
        </h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <h1 className="text-2xl text-center font-bold">
            There was a problem loading latest orders.
          </h1>
          <h1 className="text-center">{error?.message}</h1>
        </div>
      </div>
    );
  }
  if (isSuccess) {
    if (!(data?.length > 0)) {
      return (
        <div id="tools" className="my-32 text-secondary">
          <h1 className="text-4xl text-center font-medium pb-16">
            Latest Orders
          </h1>
          <div className="flex flex-col items-center gap-4 h-[200px]">
            <h1 className="text-2xl text-center font-bold">
              Currently no orders were found in the database.
            </h1>
            <h1 className="text-center">Please place some orders.</h1>
          </div>
        </div>
      );
    }

    let len = data.length;

    return (
      <div
        id="tools"
        className="my-32 text-secondary w-11/12 max-w-[1200px] mx-auto"
      >
        <h1 className="text-4xl text-center font-medium pb-16">
          Latest Orders
        </h1>
        {/* Generally 2 cols, if data is of odd length, last one takes full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 place-items-center">
          {data.map(({ _id, name, toolName, quantity, total, orderedOn }) => (
            <div
              key={_id}
              className="card w-72 bg-base-100 shadow-xl font-medium"
            >
              <div className="card-body">
                <h2 className="card-title font-bold mb-3">{toolName}</h2>
                <div className="mb-2 flex justify-between items-center">
                  <p>Order Quantity:</p>
                  <span className="font-bold text-xl">{quantity}</span>
                </div>
                <p className="mb-2 flex justify-between items-center">
                  Total: <span className="font-bold text-xl">${total}</span>
                </p>
                <div className="mb-2 flex justify-between items-center">
                  <p>On</p>
                  <span className="font-bold text-xl">
                    {format(parseISO(orderedOn), 'PP')}
                  </span>
                </div>
                <div className="mb-2 flex justify-between items-center">
                  <p>By</p>
                  <span className="font-bold text-lg">{name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default LatestSold;
