const Order = ({
  order: { _id, phone, address, quantity, total, toolName, paymentStatus },
  refetch,
  deleteOrder,
  setDeleteOrder,
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
            <div className="font-bold">{phone}</div>

            <span className="badge badge-ghost badge-sm">{address}</span>
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
        {(paymentStatus !== 'paid' || paymentStatus !== 'shipped') && (
          <span className="btn btn-xs btn-success opacity-70">pay</span>
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
