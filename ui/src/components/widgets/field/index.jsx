const Field = ({ label, children, ...props }) => {
  return (
    <div className="flex w-full flex-col text-left">
      <label className="text-md font-semibold text-gray-800" {...props}>
        {label}
      </label>
      {children}
    </div>
  );
};

export { Field };
