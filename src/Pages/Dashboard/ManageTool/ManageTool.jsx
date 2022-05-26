import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../../firebase.init';
import Spinner from '../../Shared/Spinner';
import { useDeleteTool } from '../../../Hooks/useDeleteTool';
import { useGetPublicData } from '../../../Hooks/useGetPublicData';
import ToolTuple from './ToolTuple';

const ManageTool = () => {
  const [authUser, authLoading] = useAuthState(auth);
  const [deleteTool, setDeleteTool] = useState(null);

  const {
    isError,
    isFetching,
    isLoading,
    isRefetching,
    isSuccess,
    error,
    data,
    refetch,
  } = useGetPublicData({
    name: 'getAllTools',
    url: `/api/tool/`,
  });

  const onSuccess = () => {
    toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Deletion successful.</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'successDeleteTool',
      }
    );
    refetch();
  };
  const onError = (error) => {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to delete.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorDeleteTool',
      }
    );
    refetch();
  };

  const {
    mutateAsync,
    isLoading: deleteToolLoading,
    isFetching: DeleteToolFetching,
  } = useDeleteTool({
    onSuccess,
    onError,
  });

  if (
    authLoading ||
    isLoading ||
    isFetching ||
    isRefetching ||
    DeleteToolFetching ||
    deleteToolLoading
  ) {
    return (
      <div id="tools" className="my-10 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Dashboard - Manage Tools
        </h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div id="tools" className="my-10 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Dashboard - Manage Tools
        </h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <h1 className="text-2xl text-center font-bold">
            There was a problem loading tools.
          </h1>
          <h1 className="text-center">{error?.message}</h1>
        </div>
      </div>
    );
  }
  if (isSuccess) {
    if (!(data?.length > 0)) {
      return (
        <div id="tools" className="my-10 text-secondary">
          <h1 className="text-4xl text-center font-medium pb-16">
            Dashboard - Manage Tools
          </h1>
          <div className="flex flex-col items-center gap-4 h-[200px]">
            <h1 className="text-2xl text-center font-bold">No tools found</h1>
            <h1 className="text-center">
              Please contact support for more info.
            </h1>
          </div>
        </div>
      );
    }
    return (
      <div className="mt-10 w-11/12 max-w-[800px] mx-auto">
        <h1 className="text-xl sm:text-4xl font-medium text-center">
          Dashboard - Manage Tools
        </h1>

        <div className="overflow-x-auto w-full mt-8 mb-20">
          <table className="table w-full text-xs md:text-sm lg:text-base">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Tool Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tool) => (
                <ToolTuple
                  key={tool._id}
                  tool={tool}
                  deleteTool={deleteTool}
                  setDeleteTool={setDeleteTool}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Order Modal */}
        {deleteTool && (
          <>
            <input type="checkbox" id="deleteTool" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="makeAdmin"
                  onClick={() => setDeleteTool(null)}
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>

                <div className="flex flex-col justify-center items-center gap-8 max-w-sm mx-auto">
                  <h3 className="text-lg font-bold">
                    You are about to delete #{deleteTool.slice(-4)}?
                  </h3>
                  <button
                    onClick={async () => {
                      await mutateAsync({
                        uid: authUser.uid,
                        toolId: deleteTool,
                      });
                      setDeleteTool(null);
                    }}
                    className="btn w-fit"
                  >
                    Delete Tool
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default ManageTool;
