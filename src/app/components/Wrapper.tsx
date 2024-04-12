type WrapperProps = {
  children: React.ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col rounded-md bg-white shadow-xl md:my-10 md:max-h-[80%]">
      {children}
    </div>
  );
}
