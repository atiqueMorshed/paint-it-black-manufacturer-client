import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useMakeAdmin } from '../../../Hooks/useMakeAdmin';
import { auth } from '../../../firebase.init';
import { useGetPrivateData } from '../../../Hooks/useGetPrivateData';
import Spinner from '../../Shared/Spinner';
import { useState } from 'react';
import UserTuple from './UserTuple';

const MakeAdmin = () => {
  const [authUser, authLoading] = useAuthState(auth);
  const [admin, setAdmin] = useState(null);
  const {
    isError,
    isFetching,
    isLoading,
    isRefetching,
    isSuccess,
    error,
    data,
    refetch,
  } = useGetPrivateData({
    name: 'getAllUsers',
    url: `/api/user/${authUser?.uid}`,
  });

  const onSuccess = () => {
    toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Switched to admin.</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'successMakingAdmin',
      }
    );
    refetch();
  };
  const onError = (error) => {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to make admin.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorMakingAdmin',
      }
    );
    refetch();
  };

  const {
    mutateAsync,
    isLoading: makeAdminLoading,
    isFetching: makeAdminFetching,
  } = useMakeAdmin({
    onSuccess,
    onError,
  });

  if (
    authLoading ||
    isLoading ||
    isFetching ||
    isRefetching ||
    makeAdminLoading ||
    makeAdminFetching
  ) {
    return (
      <div id="tools" className="my-10 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Dashboard - All Users
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
          Dashboard - All Users
        </h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <h1 className="text-2xl text-center font-bold">
            There was a problem loading users.
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
            Dashboard - All Users
          </h1>
          <div className="flex flex-col items-center gap-4 h-[200px]">
            <h1 className="text-2xl text-center font-bold">No users found</h1>
            <h1 className="text-center">
              Please contact support for more info.
            </h1>
          </div>
        </div>
      );
    }
    return (
      <div className="mt-10 w-11/12 xl:w-9/12 mx-auto">
        <h1 className="text-xl sm:text-4xl font-medium text-center">
          Dashboard - All Users
        </h1>

        <div className="overflow-x-auto w-full mt-8 mb-20">
          <table className="table w-full text-xs md:text-sm lg:text-base">
            <thead>
              <tr>
                <th>ID</th>
                <th>UID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered On</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <UserTuple
                  key={user._id}
                  user={user}
                  refetch={refetch}
                  admin={admin}
                  setAdmin={setAdmin}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Order Modal */}
        {admin && (
          <>
            <input type="checkbox" id="makeAdmin" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="makeAdmin"
                  onClick={() => setAdmin(null)}
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>

                <div className="flex flex-col justify-center items-center gap-8 max-w-sm mx-auto">
                  <h3 className="text-lg font-bold">
                    You are about to make #{admin.slice(-4)} an admin
                  </h3>
                  <button
                    onClick={async () => {
                      await mutateAsync({
                        uid: authUser.uid,
                        userUid: admin,
                      });
                      setAdmin(null);
                    }}
                    className="btn w-fit"
                  >
                    Make Admin
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

export default MakeAdmin;
