import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, isValid } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import toast from 'react-hot-toast';
import { useUpdateStatusToShipped } from '../../../Hooks/useUpdateStatusToShipped';

const OrderTuple = ({
  order: {
    _id,
    total,
    toolName,
    paymentStatus,
    orderedOn,
    paidOn,
    shippedOn,
    email,
  },
  adminUid,
  refetch,
  deleteOrder,
  setDeleteOrder,
}) => {
  const onSuccess = () => {
    setDeleteOrder(null);
    toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Successfully updated status to shipped.</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'successUpdateOrderStatus',
      }
    );
    refetch();
  };
  const onError = (error) => {
    setDeleteOrder(null);
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to update status to shipped.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorUpdateOrderStatus',
      }
    );
    refetch();
  };

  const { mutate, isLoading, isFetching } = useUpdateStatusToShipped({
    onSuccess,
    onError,
  });

  return (
    <tr>
      <th className="text-xs">{_id.slice(-4)}</th>
      <th>{email}</th>
      <td>{toolName}</td>
      <td>${total}</td>

      <td>
        <div className="flex items-center space-x-3">
          <div>
            <p className={`${paidOn === undefined ? 'text-base' : 'text-sm'}`}>
              Ordered: {format(parseISO(orderedOn), 'PP')}
            </p>
            {paymentStatus === 'paid' && (
              <p className="text-sm">Paid: {format(parseISO(paidOn), 'PP')}</p>
            )}
            {paymentStatus === 'shipped' && (
              <p className="text-sm">
                Shipped: {format(parseISO(shippedOn), 'PP')}
              </p>
            )}
          </div>
        </div>
      </td>

      <td>
        {paymentStatus ? (
          <span className="btn btn-xs btn-success opacity-70">
            {paymentStatus}
          </span>
        ) : (
          <span className="btn btn-xs btn-error opacity-70">pending</span>
        )}
      </td>

      <td>
        {paymentStatus === 'paid' && (
          <button
            onClick={() =>
              mutate({
                uid: adminUid,
                orderId: _id,
              })
            }
            disabled={isLoading || isFetching}
            className="btn btn-xs btn-primary opacity-70 hover:bg-opacity-40"
          >
            Ship It!
          </button>
        )}
      </td>
      <th>
        {!paymentStatus && (
          <label
            onClick={() => setDeleteOrder(_id)}
            disabled={deleteOrder === _id ? true : false}
            htmlFor="deleteOrder"
            className="btn modal-button btn-ghost btn-xs"
          >
            Delete
          </label>
        )}
      </th>
    </tr>
  );
};

export default OrderTuple;
