const Error = ({ error }) => {
  return (
    <label className="label">
      <span className="text-red-500 label-text-alt">{error}</span>
    </label>
  );
};

export default Error;
