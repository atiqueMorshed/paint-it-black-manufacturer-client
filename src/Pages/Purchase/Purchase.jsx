import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPublicData } from '../../Hooks/getPublicData';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';
import PurchaseInfo from './PurchaseInfo';
import ToolCard from './ToolCard';

const Purchase = () => {
  const { toolId } = useParams();
  const {
    isError,
    isFetching,
    isLoading,
    isRefetching,
    isSuccess,
    error,
    data,
  } = useGetPublicData({ name: 'getToolById', url: `/api/tool/${toolId}` });

  if (isLoading || isFetching || isRefetching) {
    return <SpinnerFullScreen />;
  }

  if (isError) {
    return (
      <div id="tools" className="my-32 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Tools We Provide
        </h1>
        <div className="flex flex-col items-center gap-4 h-[400px]">
          <h1 className="text-2xl text-center font-bold">
            There was a problem loading the tools from server
          </h1>
          <h1 className="text-center">{error?.message}</h1>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    if (!data) {
      return (
        <div id="tools" className="my-32 text-secondary">
          <h1 className="text-4xl text-center font-medium pb-16">Purchase</h1>
          <div className="flex flex-col items-center gap-4 h-[400px]">
            <h1 className="text-2xl text-center font-bold">
              The tool was not found in our database.
            </h1>
            <h1 className="text-center">
              Please contact support for more information.
            </h1>
          </div>
        </div>
      );
    }

    return (
      <div className="my-32 text-secondary min-h-[calc(100vh-400px)] md:max-w-[90%] mx-auto">
        <h1 className="text-4xl text-center font-medium pb-16">Purchase</h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 lg:gap-16">
          <ToolCard tool={data} />
          <div className="divider divider-horizontal"></div>
          <PurchaseInfo
            toolId={data._id}
            toolName={data.toolName}
            minQuantity={data.minQuantity}
            available={data.available}
            price={data.price}
          />
        </div>
      </div>
    );
  }
};

export default Purchase;
