type WrapperProps = {
  children: React.ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <div className="mx-auto mt-10 h-full w-full max-w-5xl shadow-xl">
      {children}
    </div>
  );
}
