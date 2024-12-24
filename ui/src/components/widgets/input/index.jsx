const Input = ({ ...props }) => {
  return (
    <input
      className="text-md rounded border-gray-600 bg-gray-100 p-2 outline-indigo-600"
      {...props}
    />
  );
};

export { Input };
