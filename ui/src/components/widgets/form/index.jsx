const Form = ({ children, ...props }) => {
  return (
    <form className="flex w-full flex-col items-center gap-2" {...props}>
      {children}
    </form>
  );
};

export { Form };
