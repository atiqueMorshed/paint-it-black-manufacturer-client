import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

const ToolTuple = ({
  tool: { _id, imageUrl, toolName },
  deleteTool,
  setDeleteTool,
}) => {
  return (
    <tr>
      <th>{_id.slice(-4)}</th>
      <th>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img
              className="w-full h-full object-cover"
              src={imageUrl}
              alt={toolName}
            />
          </div>
        </div>
      </th>
      <td>{toolName}</td>
      <td>
        <label
          onClick={() => setDeleteTool(_id)}
          disabled={deleteTool === _id ? true : false}
          htmlFor="deleteTool"
          className="btn btn-xs btn-error opacity-70"
        >
          Delete
        </label>
      </td>
    </tr>
  );
};

export default ToolTuple;
