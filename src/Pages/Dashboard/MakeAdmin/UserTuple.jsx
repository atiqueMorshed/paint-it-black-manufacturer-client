import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

const UserTuple = ({
  user: { _id, uid, email, role, registeredOn },
  refetch,
  admin,
  setAdmin,
}) => {
  return (
    <tr>
      <th>{_id.slice(-4)}</th>
      <th>{uid}</th>
      <td>{email}</td>
      <td>{role}</td>
      <td>{format(parseISO(registeredOn), 'PP')}</td>
      <td>
        {role !== 'admin' && (
          <label
            onClick={() => setAdmin(uid)}
            disabled={admin}
            htmlFor="makeAdmin"
            className="btn btn-xs btn-success opacity-70"
          >
            Make Admin
          </label>
        )}
      </td>
    </tr>
  );
};

export default UserTuple;
