type SmallScreenBtnProps = JSX.IntrinsicElements['button'];

export function SmallScreenAddBtn({ ...props }: SmallScreenBtnProps) {
  return (
    <button
      {...props}
      className="mt-2 rounded-md bg-slate-400 p-2 text-slate-800 disabled:bg-slate-300 disabled:text-slate-500 md:hidden"
    >
      Add
    </button>
  );
}
