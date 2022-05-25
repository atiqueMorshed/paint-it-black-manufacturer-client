import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

const Order = ({
  order: {
    _id,
    phone,
    address,
    quantity,
    total,
    toolName,
    paymentStatus,
    imageUrl,
    orderedOn,
    paidOn,
  },
  refetch,
  deleteOrder,
  setDeleteOrder,
  payment,
  setPayment,
  shippedOn,
}) => {
  return (
    <tr>
      <th className="text-xs">{_id.slice(-4)}</th>
      <th>{toolName}</th>
      <td>{quantity}</td>
      <td>{total}</td>

      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div>{phone}</div>

            <span className="badge badge-ghost badge-sm">{address}</span>
          </div>
        </div>
      </td>

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
          <span className="btn btn-xs btn-error opacity-70">Unpaid</span>
        )}
      </td>

      <td>
        {!paymentStatus && (
          <label
            onClick={() =>
              setPayment({ _id, total, quantity, toolName, imageUrl })
            }
            disabled={payment?._id === _id ? true : false}
            htmlFor="payOrder"
            className="btn btn-xs btn-success opacity-70"
          >
            pay
          </label>
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

export default Order;
