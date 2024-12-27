const Card = ({ children, ...props }) => {
  return (
    <div
      className="mx-auto flex w-3/6 flex-col items-center gap-4 rounded-lg border-2 border-indigo-500 px-8 py-4 font-sans shadow-sm shadow-indigo-200"
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
