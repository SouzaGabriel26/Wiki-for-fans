'use client';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="mt-10 w-full text-center">
      <h2>Something went wrong! Try again later</h2>
    </div>
  );
}
