import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import { useGetPrivateData } from '../../Hooks/useGetPrivateData';
import Spinner from '../Shared/Spinner';

const MyOrders = () => {
  const [authUser, authLoading] = useAuthState(auth);
  const {
    isError,
    isFetching,
    isLoading,
    isRefetching,
    isSuccess,
    error,
    data,
  } = useGetPrivateData({
    name: 'getToolsData',
    url: `/api/order/${authUser.uid}`,
  });

  if (authLoading || isLoading || isFetching || isRefetching) {
    return (
      <div id="tools" className="my-10 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">
          Dashboard - My Orders
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
          Dashboard - My Orders
        </h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <h1 className="text-2xl text-center font-bold">
            There was a problem loading your orders.
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
            Dashboard - My Orders
          </h1>
          <div className="flex flex-col items-center gap-4 h-[200px]">
            <h1 className="text-2xl text-center font-bold">
              You do not have any orders.
            </h1>
            <h1 className="text-center">
              Please place some orders and come back later.
            </h1>
          </div>
        </div>
      );
    }
    return (
      <div className="mt-10 w-11/12 xl:w-9/12 mx-auto">
        <h1 className="text-xl sm:text-4xl font-medium text-center">
          Dashboard - My Orders
        </h1>

        <div className="overflow-x-auto w-full mt-8">
          <table className="table w-full text-xs md:text-sm lg:text-lg">
            <thead>
              <tr>
                <th>OID</th>
                <th>Tool</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Shipping</th>
                <th>Status</th>
                <th>Pay</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({
                  _id,
                  phone,
                  address,
                  quantity,
                  total,
                  toolName,
                  paymentStatus,
                }) => (
                  <tr key={_id}>
                    <th className="text-xs">{_id.slice(-4)}</th>
                    <th>{toolName}</th>
                    <td>{quantity}</td>
                    <td>{total}</td>

                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">{phone}</div>

                          <span className="badge badge-ghost badge-sm">
                            {address}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      {paymentStatus ? (
                        <span className="btn btn-xs btn-success opacity-70">
                          {paymentStatus}
                        </span>
                      ) : (
                        <span className="btn btn-xs btn-error opacity-70">
                          Unpaid
                        </span>
                      )}
                    </td>

                    <td>
                      {(paymentStatus !== 'paid' ||
                        paymentStatus !== 'shipped') && (
                        <span className="btn btn-xs btn-success opacity-70">
                          pay
                        </span>
                      )}
                    </td>
                    <th>
                      {!paymentStatus && (
                        <button className="btn btn-ghost btn-xs">Delete</button>
                      )}
                    </th>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default MyOrders;
