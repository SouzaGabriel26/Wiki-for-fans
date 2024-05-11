type ArrowBackIconProps = JSX.IntrinsicElements['svg'];

export function ArrowBackIcon({ className, ...props }: ArrowBackIconProps) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 6L5 12M5 12L11 18M5 12H19"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
