type WrapperProps = {
  children: React.ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <div className="mx-auto h-full w-full max-w-5xl rounded-md bg-white shadow-xl md:my-10">
      {children}
    </div>
  );
}
