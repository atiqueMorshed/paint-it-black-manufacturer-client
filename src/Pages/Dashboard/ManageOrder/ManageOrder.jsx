import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase.init';
import { useGetPrivateData } from '../../../Hooks/useGetPrivateData';
import Spinner from '../../Shared/Spinner';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import OrderTuple from './OrderTuple';
import { useDeleteOrderAsAdmin } from '../../../Hooks/useDeleteOrderAsAdmin';

const ManageOrder = () => {
  const [authUser, authLoading] = useAuthState(auth);

  const [deleteOrder, setDeleteOrder] = useState();

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
    name: 'getAllOrdersAdmin',
    url: `/api/orderAdmin/${authUser.uid}`,
  });

  const onSuccess = () => {
    setDeleteOrder(null);
    toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Order successfully deleted.</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'successDeleteOrder',
      }
    );
    refetch();
  };
  const onError = (error) => {
    setDeleteOrder(null);
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to delete order.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorDeletingOrder',
      }
    );
    refetch();
  };

  const {
    mutateAsync,
    isLoading: deleteLoading,
    isFetching: deleteFetching,
  } = useDeleteOrderAsAdmin({
    onSuccess,
    onError,
  });

  if (
    authLoading ||
    isLoading ||
    isFetching ||
    isRefetching ||
    deleteLoading ||
    deleteFetching
  ) {
    return (
      <div className="my-10 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Dashboard - All Orders
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
          Dashboard - All Orders
        </h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <h1 className="text-2xl text-center font-bold">
            There was a problem loading all orders.
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
            Dashboard - All Orders
          </h1>
          <div className="flex flex-col items-center gap-4 h-[200px]">
            <h1 className="text-2xl text-center font-bold">
              There are no orders in the database.
            </h1>
            <h1 className="text-center">
              Please wait for users to make some orders.
            </h1>
          </div>
        </div>
      );
    }
    return (
      <div className="mt-10 w-11/12 xl:w-9/12 mx-auto">
        <h1 className="text-xl sm:text-4xl font-medium text-center">
          Dashboard - All Orders
        </h1>

        <div className="overflow-x-auto w-full mt-8 mb-20">
          <table className="table w-full text-xs md:text-sm lg:text-base">
            <thead>
              <tr>
                <th>OID</th>
                <th>User Email</th>
                <th>Tool Name</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Mark Shipped</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <OrderTuple
                  key={order._id}
                  order={order}
                  deleteOrder={deleteOrder}
                  setDeleteOrder={setDeleteOrder}
                  refetch={refetch}
                  adminUid={authUser.uid}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Order Modal */}
        {deleteOrder && (
          <>
            <input type="checkbox" id="deleteOrder" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="deleteOrder"
                  onClick={() => setDeleteOrder(null)}
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>

                <div className="flex flex-col justify-center items-center gap-8 max-w-sm mx-auto">
                  <h3 className="text-lg font-bold">
                    You are about to delete order #{deleteOrder?.slice(-4)}
                  </h3>
                  <button
                    onClick={async () => {
                      await mutateAsync({
                        uid: authUser.uid,
                        orderId: deleteOrder,
                      });
                      setDeleteOrder(null);
                    }}
                    className="btn w-fit"
                  >
                    Confirm Delete
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

export default ManageOrder;
