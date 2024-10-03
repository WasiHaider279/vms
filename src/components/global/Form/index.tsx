const Form = ({ onSubmit, children }: any) => {
  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      {children}
    </form>
  );
};

export default Form;
