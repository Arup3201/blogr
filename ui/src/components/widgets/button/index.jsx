const Button = ({ children, ...props }) => {
  return (
    <button
      className="text-md w-min rounded bg-indigo-500 px-10 py-2 font-medium text-white transition-all hover:bg-indigo-700"
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
