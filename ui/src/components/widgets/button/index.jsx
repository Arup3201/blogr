const Button = ({ children, ...props }) => {
  return (
    <button
      className="text-md w-min rounded bg-indigo-600 px-10 py-2 font-medium text-white hover:bg-indigo-700"
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
