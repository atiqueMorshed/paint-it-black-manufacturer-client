import { useGetPublicData } from '../../../Hooks/getPublicData';
import SpinnerFullScreen from '../../Shared/SpinnerFullScreen';
import Tool from './Tool';

const Tools = () => {
  const {
    isError,
    isFetching,
    isLoading,
    isRefetching,
    isSuccess,
    error,
    data,
  } = useGetPublicData({ name: 'getToolsData', url: '/api/tool' });

  if (isLoading || isFetching || isRefetching) {
    return <SpinnerFullScreen />;
  }

  if (isError) {
    return (
      <div id="tools" className="my-32 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Tools We Provide
        </h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <h1 className="text-2xl text-center font-bold">
            There was a problem loading the tools from server
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
            Tools We Provide
          </h1>
          <div className="flex flex-col items-center gap-4 h-[200px]">
            <h1 className="text-2xl text-center font-bold">
              Currently no tools found in DB.
            </h1>
            <h1 className="text-center">
              Please contact support for more information.
            </h1>
          </div>
        </div>
      );
    }

    let len = data.length;

    return (
      <div id="tools" className="my-32 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Tools We Provide
        </h1>
        {/* Generally 2 cols, if data is of odd length, last one takes full width */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {data.map((tool, idx) => (
            <Tool
              key={tool._id}
              tool={tool}
              isLastOdd={idx === len - 1 ? true : false}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Tools;
