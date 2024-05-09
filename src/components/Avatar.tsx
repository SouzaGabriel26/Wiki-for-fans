import Image from 'next/image';

type AvatarProps = {
  url?: string | null;
};

export function Avatar({ url }: AvatarProps) {
  if (!url) return null;

  return (
    <div className="relative h-[40px] w-[40px] items-center">
      <Image
        className="cursor-pointer rounded-full border-2 border-slate-100"
        src={url}
        alt="User avatar"
        fill
        sizes="100%"
      />
    </div>
  );
}
